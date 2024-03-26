import React, { useEffect, useState } from "react";
import APIManager from "../APIHandler/APIManager";
import { toast } from "react-toastify";

const HireCuratorForm = ({ onSubmit }) => {
  const [documents, setDocuments] = useState([]);
  const [documentId, setDocumentId] = useState();
  const [message, setMessage] = useState("");

  const fetchAllDocumentsAPICall = async () => {
    try {
      let response = await APIManager.fetchAllWriterDocuments();
      let response_json = await response.json();
      if (response_json["status"] === "OK") {
        setDocuments(response_json["data"]);
      } else {
        toast.error(response_json["data"]["message"]);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };
  useEffect(() => {
    fetchAllDocumentsAPICall();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ documentId, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
      >
        <option>Select Document</option>
        {documents.map((document,i) => {
          return <option value={document["id"]} key={i}>{document["fileName"]}</option>;
        })}
      </select>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Enter your text here..."
      />
      <button type="submit">HireMe</button>
    </form>
  );
};

export default HireCuratorForm;
