import React from "react"
import { Link, useNavigate } from "react-router-dom"
// {
// 	"status": "OK",
// 	"data": [
// 		{
// 			"id": 1,
// 			"name": "Jane Doe",
// 			"professionalBio": "Curator",
// 			"rating": 5,
// 			"hourlyRate": 14.5,
// 			"expertise": "AI, Machine Learning",
// 			"paymentId": "JaneDoe123"
// 		},
// 		{
// 			"id": 2,
// 			"name": "Jane Doe",
// 			"professionalBio": "Curator",
// 			"rating": 5,
// 			"hourlyRate": 14.5,
// 			"expertise": "AI, Machine Learning",
// 			"paymentId": "JaneDoe123"
// 		}
// 	]
// }
const Curator = ({ curator }) => {
  const navigate = useNavigate()
  return (
    // <div>
    //   <h1>{curator.id}</h1>
    //   <p>{curator.name}</p>
    //   <p>{curator.professionalBio}</p>
    //   <p>{curator.rating}</p>
    //   <p>{curator.hourlyRate}</p>
    //   <p>{curator.expertise}</p>
    //   <p>{curator.paymentId}</p>
    //   <button onClick={(e)=>{e.preventDefault(); navigate("/dashboard/hire-curator", {
    //       state: curator,
    //     }); } }>Select Curator</button>
    // </div>

    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-5">
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="design-tab-pane"
          role="tabpanel"
          aria-labelledby="design-tab"
          tabIndex={0}
        >
          <div className="row">
            <div className="">
              <div className="custom-block bg-white shadow-lg">
                <div>
                  <div className="d-flex">
                    <h5 className="mb-0">{curator.name}</h5>
                    <span className="badge bg-design rounded-pill ms-auto">{curator.rating}/5</span>
                  </div>
                  <p className="mb-0">{curator.professionalBio}</p>
                  <p className="mb-0">{curator.hourlyRate}$</p>
                  {/* <p className="mb-0">{curator.paymentId}</p> */}
                  <div className="d-flex mt-2 gap-1">
                    {curator.expertise.split(",").map((item, index) => (
                      <span key={item + index} className="badge bg-secondary rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => {
                        navigate("/dashboard/hire-curator", {
                          state: curator,
                        })
                      }}
                      style={{ width: "8em" }}
                      className="btn custom-btn mt-2 mt-lg-3"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Curator
