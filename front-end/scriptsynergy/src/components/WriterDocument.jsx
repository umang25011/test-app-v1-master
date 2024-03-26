import React from "react"
import APIManager from "../APIHandler/APIManager"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

// {
// 	"status": "OK",
// 	"data": [
// 		{
// 			"id": 1,
// 			"fileName": "jdass.txt",
// 			"fileType": "PLAIN_TEXT"
// 		}
// 	]
// }

export default function WriterDocument({ document }) {
  const navigate = useNavigate()
  const document_copy = document
  const openEditorButtonClickHandler = async (event) => {
    event.preventDefault()
    try {
      let response = await APIManager.fetchWriterDocumentPresignedURL(document_copy["id"])
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        let url = response_json["data"]["url"]
        let editor_content_resp = await fetch(url)
        let editor_content_resp_text = await editor_content_resp.text()
        navigate("/dashboard/open-editor", {
          state: {
            editorContentValue: editor_content_resp_text,
            fileNameValue: document_copy["fileName"],
          },
        })
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  return (
    // <div>
    //   <p>{document_copy.fileName}</p>
    //   <button onClick={openEditorButtonClickHandler}>Open in Editor</button>
    // </div>

    <section className="explore-section section-padding" id="section_2">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="mb-4">Dashboard</h2>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="col-lg-4 col-md-4 col-12">
          <div className="custom-block custom-block-overlay">
            <div className="d-flex flex-column">
              <div className="custom-block-overlay-text d-flex">
                <div>
                  <h5 className="text-white mb-2">{document_copy.fileName}</h5>

                  <p className="text-white">
                    Lorem ipsum dolor
                  </p>

                  <button onClick={openEditorButtonClickHandler} className="btn custom-btn mt-2">
                    Edit
                  </button>
                </div>

              </div>
              <div className="section-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
