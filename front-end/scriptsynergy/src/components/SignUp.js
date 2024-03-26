import React from 'react';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import APIManager from '../APIHandler/APIManager';
import { login } from './Auth';
// const response = await fetch('http://localhost:8000/signup/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         // Redirect to dashboard upon successful account creation
//         navigate('/dashboard');
//       } else {
//         // Handle other responses here
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error responses here
//     }
const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      let response = await APIManager.signupUser(formData);
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
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SignUp;
