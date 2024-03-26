from traceback import print_tb

from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from script_synergy.exceptions import (
    SynergyInvalidPasswordException,
    SynergyBaseException,
    SynergyNoSuchUserFoundException,
    SynergyInvalidRoleException,
)
from script_synergy.models import Curator, Writer, WriterDocuments, Notifications
from script_synergy.constants import INTERNAL_SERVER_ERROR_MESSAGE, Roles
from script_synergy.utils import SynergyAuthentication


class LoginAPIView(APIView):
    def post(self, request: Request):
        try:
            data = request.data
            email = data["userId"]
            password = data["userPass"]
            role = data["role"]  # Get the role field from the incoming data
            user = None
            if role == Roles.WRITER:
                user = Writer.fetch_writer_based_on_email(email=email)
                # print("Writer found in database:", user.email)
            elif role == Roles.CURATOR:
                user = Curator.fetch_curator_based_on_email(email=email)
                # print("Curator found in database:", user.email)
            # Check if the password matches
            if user is None:
                raise SynergyNoSuchUserFoundException(email=email)
            elif user.validate_password(
                password=password
            ):  # Assuming passwords are stored in plaintext
                # Generate JWT token
                token = user.create_new_jwt_token()
                return Response(
                    data={
                        "status": "OK",
                        "data": {"token": token, "message": "Successful Login"},
                    }
                )
            else:
                raise SynergyInvalidPasswordException()

        except SynergyBaseException as e:
            return Response(data={"status": "ERROR", "data": {"message": e.message}})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SignUpView(APIView):
    def post(self, request: Request):
        try:
            data = request.data
            email = data.get("email")
            password = data.get("password")
            role = data.get("role")
            # Check the role and save data accordingly
            if role == Roles.WRITER:
                user = Writer.create_new_writer(email=email, password=password)
            elif role == Roles.CURATOR:
                user = Curator.create_new_curator(email=email, password=password)
            else:
                # Handle invalid role
                raise SynergyInvalidRoleException(role=role)
            return Response(
                data={
                    "status": "OK",
                    "data": {
                        "token": user.create_new_jwt_token(),
                        "message": "Successful User Registrations",
                    },
                }
            )
        except SynergyBaseException as e:
            return Response(data={"status": "ERROR", "data": {"message": e.message}})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ValidateJWTTokenAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request: Request):
        return Response(data={"status": "OK"})


class SaveWriterDocumentTextAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    # Writer should only access this view
    def post(self, request: Request):
        try:
            data = request.data
            editor_content = data["editor_content"]
            file_name = data["file_name"]
            WriterDocuments.store_writers_text_document(
                writer=request.user, edited_content=editor_content, file_name=file_name
            )
            return Response(
                data={"status": "OK", "data": {"message": "File saved successfully"}}
            )
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request: Request):
        try:
            data = request.data
            editor_content = data["editor_content"]
            document_id = data["document_id"]
            WriterDocuments.update_writers_text_document(
                document_id=document_id, edited_content=editor_content
            )
            return Response(
                data={"status": "OK", "data": {"message": "File saved successfully"}}
            )
        except Exception:
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WritersDocumentsListAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    # Writer should only access this view
    def get(self, request: Request):
        try:
            if isinstance(request.user, Writer):
                resp = WriterDocuments.fetch_all_the_documents(writer=request.user)
            else:
                resp = []
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WriterDocumentPreSignedDocumentURLAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request, document_id: int):
        try:
            document = WriterDocuments.get_writer_document_by_id_and_writer(
                primary_key=document_id, writer=request.user
            )
            url = document.get_presigned_url()
            return Response(data={"status": "OK", "data": {"url": url}})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CuratorsListAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request):
        try:
            resp = Curator.fetch_all_curators()
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SendCuratorInvitationAPIview(APIView):
    authentication_classes = [SynergyAuthentication]

    def post(self, request: Request):
        try:
            writer = request.user
            if isinstance(writer, Writer):

                data = request.data
                print(data)
                curator_id = data["curatorId"]
                document_id = data["documentId"]
                message = data["message"]
                Notifications.create_new_instance(
                    writer,
                    curator_id=curator_id,
                    document_id=document_id,
                    message=message,
                )
                return Response(
                    data={"status": "OK", "data": {"message": "Successfully Invited"}}
                )
            else:
                raise Exception("Invalid Permission for the user")
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


def welcome(request):
    return HttpResponse("Welcome to the Django server.")


def test_api(request):
    return HttpResponse("successful test-api test.")
