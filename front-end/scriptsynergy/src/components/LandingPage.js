import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <p>Please sign in or sign up to continue.</p>
      <div>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
