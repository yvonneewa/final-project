import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Auth = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Name:", loginName);
    console.log("Login Password:", loginPassword);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Name:", signupName);
    console.log("Signup Password:", signupPassword);
  };

  return (
    <div className="login-signup-page">
    <div className="auth-container">
      {/* Login Form */}
      <div className="form login-form">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="name-login">Name:</label>
            <input
              className="form-input"
              type="text"
              id="name-login"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-login">Password:</label>
            <input
              className="form-input"
              type="password"
              id="password-login"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Signup Form */}
      <div className="form signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label htmlFor="name-signup">Name:</label>
            <input
              className="form-input"
              type="text"
              id="name-signup"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
          </div>
          {/* Uncomment if email is needed */}
          {/* <div className="form-group">
            <label htmlFor="email-signup">Email:</label>
            <input
              className="form-input"
              type="email"
              id="email-signup"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="password-signup">Password:</label>
            <input
              className="form-input"
              type="password"
              id="password-signup"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Auth;
