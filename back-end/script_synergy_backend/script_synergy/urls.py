from django.urls import path
from script_synergy.views import (
    LoginAPIView,
    SignUpView,
    ValidateJWTTokenAPIView,
    WritersDocumentsListAPIView,
    WriterDocumentPreSignedDocumentURLAPIView,
    CuratorsListAPIView,
    welcome,
    test_api,
    SaveWriterDocumentTextAPIView,
    SendCuratorInvitationAPIview,
)

urlpatterns = [
    path("", welcome, name="welcome"),
    path("validate-token/", ValidateJWTTokenAPIView.as_view(), name="validate_token"),
    path(
        "save_editor_text/",
        SaveWriterDocumentTextAPIView.as_view(),
        name="save_editor_text",
    ),
    path(
        "writer-documents/",
        WritersDocumentsListAPIView.as_view(),
        name="writers_documents",
    ),
    path(
        "writer-documents-presigned-url/<int:document_id>/",
        WriterDocumentPreSignedDocumentURLAPIView.as_view(),
        name="writers_document_presigned_url",
    ),
    path("all-curators/", CuratorsListAPIView.as_view(), name="curators_list"),
    path(
        "send-curator-invitaion/",
        SendCuratorInvitationAPIview.as_view(),
        name="send_curator_invitation",
    ),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("test-api/", test_api, name="test_api"),
]
