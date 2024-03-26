import boto3
from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request
from rest_framework.authentication import BaseAuthentication
from script_synergy.constants import Roles
from script_synergy_backend.settings import SECRET_KEY
import jwt


class SynergyAuthentication(BaseAuthentication):
    def authenticate(self, request: Request):
        from script_synergy.models import Writer, Curator

        token = request.META.get("HTTP_AUTHORIZATION")
        if token is not None and token != "null":
            try:
                decoded_token = jwt.decode(
                    jwt=token, key=SECRET_KEY, algorithms=["HS256"]
                )
                role = decoded_token.get("role")
                if role is None:
                    raise NotAuthenticated(detail="Invalid Authentication Details")
                elif role == Roles.WRITER:
                    email = decoded_token["email"]
                    user = Writer.fetch_writer_based_on_email(email=email)
                elif role == Roles.CURATOR:
                    email = decoded_token["email"]
                    user = Curator.fetch_curator_based_on_email(email=email)
                else:
                    raise NotAuthenticated(detail="Invalid Authentication Details")
                return tuple([user, token])
            except jwt.exceptions.InvalidTokenError as e:
                print(e)
        raise NotAuthenticated(detail="Invalid Authentication Details")


class S3Handler:
    S3_BUCKET_NAME = "synergy-papers"
    S3_BUCKET_PATH = f"s3://{S3_BUCKET_NAME}"

    def __init__(self):
        self.s3_client = boto3.client("s3")

    def get_bucket_items(self) -> dict:
        """
        :return: dict
        """
        return self.s3_client.list_objects_v2(Bucket=self.S3_BUCKET_NAME)

    def upload_file_item(self, file, s3_file_name):
        return self.s3_client.upload_fileobj(file, self.S3_BUCKET_NAME, s3_file_name)

    def download_file_item(self, s3_file_name):
        download_file = self.s3_client.download_file(
            self.S3_BUCKET_NAME, s3_file_name, s3_file_name
        )

    def download_file_item_as_file_stream(self, temp_file, s3_file_name):
        return self.s3_client.download_fileobj(
            self.S3_BUCKET_NAME, s3_file_name, temp_file
        )

    def generate_presigned_url(self, s3_file_name):
        url = self.s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.S3_BUCKET_NAME, "Key": s3_file_name},
            ExpiresIn=300,
        )
        return url
