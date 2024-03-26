import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import OpenEditor from "./components/OpenEditor";
import ExploreCurators from "./components/ExploreCurators";
import Archives from "./components/Archives";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HireCurator from "./components/HireCurator";
import Header from "./components/Header"

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/open-editor" element={<OpenEditor />} />
            <Route
              path="/dashboard/explore-curators"
              element={<ExploreCurators />}
            />
            <Route path="/dashboard/archives" element={<Archives />} />
            <Route
              path="/dashboard/hire-curator"
              element={<HireCurator />}
            />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
// {/* <Route element={<ProtectedRoute/>}>

// </Route> */}
// {/* <Route path="/dashboard" element={<Dashboard />} /> */}
// {/* Add trailing * to the parent Route path */}
// {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
// {/* Nested routes for Dashboard */}
// {/* <Route path="/dashboard/open-editor" element={<OpenEditor />} />
// <Route path="/dashboard/explore-curators" element={<ExploreCurators />} />
// <Route path="/dashboard/archives" element={<Archives />} /> */}
