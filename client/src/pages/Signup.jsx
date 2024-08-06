import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Name:', name);
    console.log('Password:', password);


    navigate('/home'); 
  };

  return (
    <div className="login-signup-page">
    <div className="row">
      <div className="col-md-6">
        <h2>Signup</h2>
        <form className="form signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name-signup">Name:</label>
            <input
              className="form-input"
              type="text"
              id="name-signup"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-signup">Password:</label>
            <input
              className="form-input"
              type="password"
              id="password-signup"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <h2>Login</h2>
        <form className="form login-form">
          <div className="form-group">
            <label htmlFor="name-login">Name:</label>
            <input
              className="form-input"
              type="text"
              id="name-login"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-login">Password:</label>
            <input
              className="form-input"
              type="password"
              id="password-login"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
