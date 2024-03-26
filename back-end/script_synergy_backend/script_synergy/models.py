import datetime
import re
from io import BytesIO
from typing import Optional

from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.db import models
import jwt
from django.utils import timezone

from script_synergy.constants import Roles
from script_synergy.utils import S3Handler
from script_synergy_backend.settings import SECRET_KEY


class CreateAndUpdateDateTimeModel(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        now = timezone.now()
        if self.pk is None:
            self.created_at = now
            self.updated_at = now
        else:
            self.updated_at = now
        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )

    class Meta:
        abstract = True


class Writer(CreateAndUpdateDateTimeModel):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def create_new_jwt_token(self):
        return jwt.encode(
            payload={"userId": self.pk, "email": self.email, "role": Roles.WRITER},
            key=SECRET_KEY,
        )

    def validate_password(self, password):
        return self.password == password

    @classmethod
    def create_new_writer(cls, email, password) -> "Writer":
        """
        Need to have unique email exception
        """
        instance = Writer(email=email, password=password)
        instance.save()
        return instance

    @classmethod
    def fetch_writer_based_on_email(cls, email) -> Optional["Writer"]:
        try:
            return cls.objects.get(email=email)
        except cls.DoesNotExist:
            return None


class Curator(CreateAndUpdateDateTimeModel):
    name = models.CharField(max_length=255, default="Jane Doe")
    professional_bio = models.TextField(default="Curator")
    rating = models.SmallIntegerField(default=5)
    hourly_rate = models.FloatField(default=14.5)
    expertise = models.TextField(
        validators=[RegexValidator(regex=r"^[a-z,\s*]+$", flags=re.IGNORECASE)],
        default="AI, Machine Learning",
    )
    payment_id = models.TextField(default="JaneDoe123")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    @classmethod
    def fetch_all_curators(cls):
        curators = cls.objects.all()
        resp = []
        for curator in curators:
            resp.append(
                {
                    "id": curator.pk,
                    "name": curator.name,
                    "professionalBio": curator.professional_bio,
                    "rating": curator.rating,
                    "hourlyRate": curator.hourly_rate,
                    "expertise": curator.expertise,
                    "paymentId": curator.payment_id,
                }
            )
        return resp

    def create_new_jwt_token(self):
        return jwt.encode(
            payload={"userId": self.pk, "email": self.email, "role": Roles.CURATOR},
            key=SECRET_KEY,
        )

    def validate_password(self, password):
        return self.password == password

    @classmethod
    def fetch_curator_based_on_email(cls, email) -> Optional["Curator"]:
        try:
            return cls.objects.get(email=email)
        except cls.DoesNotExist:
            return None

    @classmethod
    def create_new_curator(cls, email, password) -> "Curator":
        instance = Curator(email=email, password=password)
        instance.save()
        return instance


class WriterDocuments(CreateAndUpdateDateTimeModel):
    class DocumentType(models.IntegerChoices):
        PLAIN_TEXT = 0, "Plain Text"
        PDF = 1, "PDF"

    writer = models.ForeignKey(
        to=Writer,
        db_constraint=False,
        on_delete=models.CASCADE,
        related_name="writer_documents",
    )
    file_name = models.CharField(max_length=255)
    _document_type = models.SmallIntegerField(choices=DocumentType.choices)

    def get_document_type(self):
        return self.DocumentType(self._document_type)

    def set_document_type(self, doctype):
        self._document_type = self.DocumentType[doctype]

    document_type = property(get_document_type, set_document_type)

    def get_presigned_url(self):
        return S3Handler().generate_presigned_url(s3_file_name=self.file_name)

    @classmethod
    def get_writer_document_by_id(cls, primary_key):
        return cls.objects.get(pk=primary_key)

    @classmethod
    def get_writer_document_by_id_and_writer(cls, primary_key, writer):
        return cls.objects.get(pk=primary_key, writer=writer)

    @classmethod
    def store_writers_text_document(cls, writer: Writer, edited_content, file_name):
        file_type = "txt"
        file_name = file_name + "." + file_type
        S3Handler().upload_file_item(
            file=BytesIO(bytes(edited_content, "UTF-8")), s3_file_name=file_name
        )
        instance = WriterDocuments(
            writer=writer,
            file_name=file_name,
            _document_type=cls.DocumentType.PLAIN_TEXT.value,
        )
        instance.save()

    @classmethod
    def update_writers_text_document(cls, document_id, edited_content):
        document = cls.get_writer_document_by_id(primary_key=document_id)
        S3Handler().upload_file_item(
            file=BytesIO(bytes(edited_content, "UTF-8")),
            s3_file_name=document.file_name,
        )
        document.save()

    @classmethod
    def fetch_all_the_documents(cls, writer):
        documents = cls.objects.filter(writer=writer)
        resp = []
        for document in documents:
            resp.append(
                {
                    "id": document.pk,
                    "fileName": document.file_name,
                    "fileType": document.document_type.name,
                }
            )
        return resp


class Notifications(CreateAndUpdateDateTimeModel):
    class Status(models.IntegerChoices):
        CURATOR_INVITED = 0, "CURATOR_INVITED"
        CURATOR_ACCEPTED_INVITE = 1, "CURATOR_ACCEPTED_INVITE"
        DOCUMENT_CURATED = 2, "DOCUMENT_CURATED"
        CURATOR_DECLINED_INVITE = 3, "CURATOR_DECLINED_INVITE"

    writer = models.ForeignKey(
        to=Writer,
        db_constraint=False,
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    curator = models.ForeignKey(
        to=Curator,
        db_constraint=False,
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    document = models.ForeignKey(
        to=WriterDocuments,
        db_constraint=False,
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    writer_message = models.TextField(null=True, blank=True)
    curator_message = models.TextField(null=True, blank=True)
    curator_score = models.IntegerField(
        null=True,
        blank=True,
        validators=[
            MinValueValidator(limit_value=-1, message="Please score between 0 and 100"),
            MaxValueValidator(
                limit_value=101, message="Please score between 0 and 100"
            ),
        ],
    )
    _statue = models.SmallIntegerField(
        choices=Status.choices, default=Status.CURATOR_INVITED.value
    )

    def get_status(self):
        return self.Status(self._statue)

    def set_status(self, status_name):
        self._statue = self.Status[status_name]

    status = property(get_status, set_status)

    @classmethod
    def create_new_instance(cls, writer, curator_id, document_id, message):
        curator = Curator.objects.get(pk=curator_id)
        document = WriterDocuments.get_writer_document_by_id(primary_key=document_id)
        instance = Notifications(
            writer=writer, curator=curator, document=document, writer_message=message
        )
        instance.save()
