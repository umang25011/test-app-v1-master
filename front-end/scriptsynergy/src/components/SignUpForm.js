import React, { useState } from 'react';

const SignUpForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('writer'); // Default role is 'writer'

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <input
          type="radio"
          id="writer"
          value="writer"
          checked={role === 'writer'}
          onChange={() => setRole('writer')}
        />
        <label htmlFor="writer">Writer</label>
      </div>
      <div>
        <input
          type="radio"
          id="curator"
          value="curator"
          checked={role === 'curator'}
          onChange={() => setRole('curator')}
        />
        <label htmlFor="curator">Curator</label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
