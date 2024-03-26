import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./Auth"; // Assuming you have an auth module with an isAuthenticated function

const ProtectedRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false)
  console.log(authenticated)
  return true ? <Outlet/> : <Navigate to="/signin"/>
};

export default ProtectedRoutes;
