import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div id="sticky-wrapper is-sticky" className="sticky-wrapper">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <i className="bi-back"></i>
            <span>Topic</span>
          </a>

          <div className="d-lg-none ms-auto me-4">
            <a href="#top" className="navbar-icon bi-person smoothscroll"></a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-lg-5 me-lg-auto">
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link click-scroll">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/dashboard/explore-curators" className="nav-link click-scroll">
                  Explore Curators
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/dashboard/open-editor" className="nav-link click-scroll">
                  Open Editor
                </Link>
              </li>
            </ul>
            <div className="d-none d-lg-block">
              <a href="#top" className="navbar-icon bi-person smoothscroll"></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
