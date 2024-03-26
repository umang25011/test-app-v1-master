import React from 'react';
import { Link } from 'react-router-dom';

const Archives = () => {
  return (
    <div>
      <h2>Welcome to Archives</h2>
      {/* Link to go back to the dashboard */}
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default Archives;
