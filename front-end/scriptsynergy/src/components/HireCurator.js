import React from 'react'
import APIManager from '../APIHandler/APIManager'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import HireCuratorForm from './HireCuratorForm'

export default function HireCurator() {
const {state} = useLocation()
const handleSubmit = async (formData) => {
    let requestBody = {
        curatorId: state["id"],
        documentId: formData["documentId"],
        message: formData["message"]
    }
    console.log(requestBody)
    try {
      let response = await APIManager.sendCuratorInvitaion(requestBody);
      let data = await response.json();
      if (data["status"] === "OK") {
       toast.success(data["data"]["message"])
      } else {
        toast.error(data["data"]["message"]);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  };
  return (
    <div>
       <h1> Hire Me Form</h1>
       <HireCuratorForm onSubmit={handleSubmit} />
    </div>
  )
}
