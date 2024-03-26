import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import APIManager from '../APIHandler/APIManager';

const OpenEditor = () => {
  const { state } = useLocation();
  let editorContentValue = ""
  let fileNameValue = ""
  if(state != null){
    editorContentValue = state["editorContentValue"]
    fileNameValue = state["fileNameValue"]
  }

  const [editorContent, setEditorContent] = useState(editorContentValue);
  const [fileName, setFileName] = useState(fileNameValue);

  const handleSave = () => {
    if (!fileName.trim()) {
      toast.error('Please enter a file name.');
      return;
    }
    saveEditorData();
  };

  const saveEditorData = async() => {
    const requestBody = {
      editor_content: editorContent,
      file_name: fileName // Add file name to the request body
    };
    try {
      let response = await APIManager.saveEditorContent(requestBody)
      let response_json = await response.json()
      if(response_json["status"]=== "OK"){
        toast.success(response_json["data"]["message"]);
      }else{
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong we are looking into")
    }
  };

  return (
    <div>
      <h2>Welcome to Open Editor</h2>
      <textarea
        value={editorContent}
        onChange={e => setEditorContent(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Enter your text here..."
      />
      <br />
      <input
        type="text"
        value={fileName}
        onChange={e => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <br />
      <button onClick={handleSave}>Save</button>
      <br />
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default OpenEditor;
