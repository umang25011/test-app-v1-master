import { getToken } from "../components/Auth";
import ENDPOINTS from "./Endpoints";

const BASEURL = "http://127.0.0.1:8000";

const getJsonStrigfiedToken = () => {
  return getToken()
}
class APIManager {
  static loginUser = (data) => {
    const url = BASEURL + ENDPOINTS.LOGIN;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  static signupUser = (data) => {
    const url = BASEURL + ENDPOINTS.SIGNUP;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  static validateToken = (token) => {
    const url = BASEURL + ENDPOINTS.VALIDATE_TOKEN;
    return fetch(url, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  };
  static saveEditorContent = (data) => {
    const url = BASEURL + ENDPOINTS.SAVE_EDITOR_CONTENT;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: getJsonStrigfiedToken(),
      },
    });
  };
  static fetchAllWriterDocuments = () => {
    const url = BASEURL + ENDPOINTS.FETCH_ALL_WRITER_DOCUMENTS;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getJsonStrigfiedToken(),
      },
    });
  };
  static fetchWriterDocumentPresignedURL = (docuemntId) => {
    const url = BASEURL + ENDPOINTS.FETCH_WRITER_DOCUMENT_PRESIGNED_URL(docuemntId);
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getJsonStrigfiedToken(),
      },
    });
  };
  static fetchAllCurators = () => {
    const url = BASEURL + ENDPOINTS.FETCH_ALL_CURATORS;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getJsonStrigfiedToken(),
      },
    });
  };
  static sendCuratorInvitaion = (data) => {
    const url = BASEURL + ENDPOINTS.SEND_CURATOR_INVITATIONS;
    return fetch(url, {
      method: "POST",
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: getJsonStrigfiedToken(),
      },
    });
  }
}

export default APIManager;
