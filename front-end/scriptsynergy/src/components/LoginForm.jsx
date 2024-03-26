import React, { useState } from "react"

const LoginForm = ({ onSubmit }) => {
  const [userId, setUserId] = useState("")
  const [userPass, setUserPass] = useState("")
  const [role, setRole] = useState("writer") // Default role is 'writer'

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ userId, userPass, role })
  }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="text"
  //       placeholder="User ID"
  //       value={userId}
  //       onChange={(e) => setUserId(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       value={userPass}
  //       onChange={(e) => setUserPass(e.target.value)}
  //     />
  //     <div>
  //       <input
  //         type="radio"
  //         id="writer"
  //         value="writer"
  //         checked={role === 'writer'}
  //         onChange={() => setRole('writer')}
  //       />
  //       <label htmlFor="writer">Writer</label>
  //     </div>
  //     <div>
  //       <input
  //         type="radio"
  //         id="curator"
  //         value="curator"
  //         checked={role === 'curator'}
  //         onChange={() => setRole('curator')}
  //       />
  //       <label htmlFor="curator">Curator</label>
  //     </div>
  //     <button type="submit">Sign In</button>
  //   </form>
  // );

  return (
    <React.Fragment>
    <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            <h1 className="text-white text-center">Discover. Learn. Enjoy</h1>
            <h6 className="text-center">platform for creatives around the world</h6>
            <form
              onSubmit={handleSubmit}
              className="custom-form d-flex flex-column align-items-center contact-form mt-4 pt-2 mb-lg-0 mb-5"
              role="search"
            >
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="form-control"
                  />
                  <label for="floatingInput">User ID</label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-floating">
                  <input
                    type="password"
                    placeholder="Password"
                    value={userPass}
                    onChange={(e) => setUserPass(e.target.value)}
                    className="form-control"
                  />
                  <label for="floatingInput">Password</label>
                </div>
              </div>

              <div className="d-flex justify-content-center text-white gap-2 mb-3">
                <div>
                  <input
                    type="radio"
                    id="writer"
                    value="writer"
                    checked={role === "writer"}
                    onChange={() => setRole("writer")}
                    className="form-check-input"
                  />
                  <label htmlFor="writer" className="form-check-label">
                    Writer
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="curator"
                    value="curator"
                    checked={role === "curator"}
                    onChange={() => setRole("curator")}
                    className="form-check-input"
                  />
                  <label htmlFor="curator" className="form-check-label">
                    Curator
                  </label>
                </div>
              </div>
              <button type="submit" className="form-control">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>
  )
}

export default LoginForm
