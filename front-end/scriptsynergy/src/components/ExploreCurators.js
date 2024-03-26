import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import APIManager from "../APIHandler/APIManager"
import { toast } from "react-toastify"
import Curator from "./Curator"

const ExploreCurators = () => {
  const [curators, setCurators] = useState([])
  const fetchAllCuratorsAPICall = async () => {
    try {
      let response = await APIManager.fetchAllCurators()
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        setCurators(response_json["data"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  useEffect(() => {
    fetchAllCuratorsAPICall()
  }, [])
  return (
    <section className="explore-section section-padding" id="section_2">
      <div className="container">
        <div className="row">
        <div className="col-12 text-center mb-2">
            <h2 className="mb-4">Curators</h2>
          </div>
          {curators.map((curator, i) => (
            <Curator curator={curator} key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreCurators
