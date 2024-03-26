const ENDPOINTS  = {
    LOGIN : "/login/",
    SIGNUP: "/signup/",
    VALIDATE_TOKEN:"/validate-token/",
    SAVE_EDITOR_CONTENT:"/save_editor_text/",
    FETCH_ALL_WRITER_DOCUMENTS:"/writer-documents/",
    FETCH_WRITER_DOCUMENT_PRESIGNED_URL: (documentId) => `/writer-documents-presigned-url/${documentId}/`,
    FETCH_ALL_CURATORS: "/all-curators/",
    SEND_CURATOR_INVITATIONS:"/send-curator-invitaion/"

}
export default ENDPOINTS;