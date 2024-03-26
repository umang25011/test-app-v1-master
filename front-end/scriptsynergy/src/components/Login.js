import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { login } from "./Auth";
import APIManager from "../APIHandler/APIManager";
const Login = () => {
  let navigate = useNavigate()
  const handleSubmit = async (formData) => {
    try {
      let response = await APIManager.loginUser(formData);
      let data = await response.json();
      if (data["status"] === "OK") {
        let token = data["data"]["token"];
        login(token);
        navigate('/dashboard');
      } else {
        console.log(data["data"]["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
