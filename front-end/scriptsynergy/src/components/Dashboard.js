import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import APIManager from "../APIHandler/APIManager"
import WriterDocument from "./WriterDocument"

const Dashboard = () => {
  const [documents, setDocuments] = useState([])
  const fetchAllDocumentsAPICall = async () => {
    try {
      let response = await APIManager.fetchAllWriterDocuments()
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        setDocuments(response_json["data"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  useEffect(() => {
    fetchAllDocumentsAPICall()
  }, [])
  return (
    <>
      {documents.map((document, i) => (
        <WriterDocument document={document} key={i} />
      ))}
    </>
  )
}

export default Dashboard
