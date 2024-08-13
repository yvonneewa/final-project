import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER, CREATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import auth from "../utils/auth";
import "../App.css";

const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const [signupUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedLoginName = loginName?.trim().toLowerCase();
      const response = await loginUser({
        variables: { username: formattedLoginName, password: loginPassword },
      });
      const token = response.data.login.token;
      auth.login(token);
      navigate('/'); 
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Username or password is incorrect."); // Set error message
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Signup Name:", signupName);
    console.log("Signup Password:", signupPassword);
    try {
      const formattedSignupName = signupName?.trim().toLowerCase(); 
      console.log("Formatted Username:", formattedSignupName); 
      const response = await signupUser({
        variables: { username: formattedSignupName, email: signupEmail, password: signupPassword },
      });
      const token = response.data.signup.token;
      auth.login(token);
      navigate('/'); 
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Signup failed. Please try again."); // Set error message
    }
  };

  return (
    <section className="login-page">
      <div className="auth-container">
        <div className="header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 w-10 h-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
          <h1 className="title">
            Login/Signup<span className="font-mono">™</span>
          </h1>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {currentPage === "login" ? (
          <form onSubmit={handleLoginSubmit} className="form">
            <label className="text-sm font-medium">Username</label>
            <input
            className="blacktext"
              type="text"
              name="username"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />
            <label className="text-sm font-medium">Password</label>
            <input
            className="blacktext"
              type="password"
              name="password"
              placeholder="********"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="form">
            <label className="text-sm font-medium">Username</label>
            <input
            className="blacktext"
              type="text"
              name="username"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
            <label className="text-sm font-medium">Email</label>
            <input
            className="blacktext"
              type="email"
              name="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <label className="text-sm font-medium">Password</label>
            <input
            className="blacktext"
              type="password"
              name="password"
              placeholder="********"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Signup
            </button>
          </form>
        )}

        <button
          className="toggle-button"
          onClick={() => {
            setCurrentPage(currentPage === "login" ? "signup" : "login");
            setErrorMessage(""); // Clear error message when switching pages
          }}
        >
          {currentPage === "login" ? "Sign Up Instead" : "Login Instead"}
        </button>
      </div>
    </section>
  );
};

export default Login;
