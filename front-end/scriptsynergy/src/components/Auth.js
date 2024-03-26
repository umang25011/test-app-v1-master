// auth.js

import APIManager from "../APIHandler/APIManager";

// Function to check if user is authenticated
export const isAuthenticated = async () => {
    // Check if user token exists in localStorage
    // let token = localStorage.getItem('token')
    try {
      let token = localStorage.getItem('token')
      let response = await APIManager.validateToken(token);
      if(response.ok){
        return true
      }
      else{
          return false
      }
    } catch (err) {
      console.log(err)
      return false
    }
  };
  
  // Function to login user
  export const login = (token) => {
    // Store user token in localStorage
    localStorage.setItem('token', token);
  };
  
  // Function to logout user
  export const logout = () => {
    // Remove user token from localStorage
    localStorage.removeItem('token');
  };
  
  export const getToken = () => {
    // Store user token in localStorage
    return localStorage.getItem('token');
  };