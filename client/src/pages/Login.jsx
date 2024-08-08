import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

import auth from "../utils/auth";

const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);

  const [currentPage, setCurrentPage] = useState("login");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Name:", loginName);
    console.log("Login Password:", loginPassword);

    const response = await loginUser({
      variables: {
        username: loginName,
        password: loginPassword,
      },
    });

    const token = response.data.login.token;
    auth.login(token);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Name:", signupName);
    console.log("Signup Password:", signupPassword);
  };

  return (
    <>
      <section
        id="login"
        className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
      >
        <div className="p-6 bg-sky-100 rounded">
          <div className="flex items-center justify-center text-4xl font-black text-sky-900 m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 w-10 h-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
            <h1 className="tracking-wide">
              Login/Signup<span className="font-mono">™</span>
            </h1>
          </div>

          {currentPage == "login" ? (
            // THIS IS THE LOGIN FORM
            <form
              id="login_form"
              onSubmit={handleLoginSubmit}
              className="flex flex-col justify-center"
            >
              <label className="text-sm font-medium">Username</label>
              <input
                className="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
                type="text"
                name="username"
                id="name-login"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                required
              />
              <label className="text-sm font-medium">Password</label>
              <input
                className="
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
                type="password"
                name="password"
                placeholder="********"
                id="password-login"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                className="px-4 py-1.5 rounded-md shadow-lg bg-sky-600 font-medium text-gray-100 block hover:bg-sky-700 transition duration-300"
                type="submit"
              >
                <span id="login_process_state" className="hidden">
                  Checking ...
                </span>
                <span id="login_default_state">Login</span>
              </button>
            </form>
          ) : (
            // THIS IS THE SIGNUP FORM
            <form
              id="login_form"
              onSubmit={handleSignupSubmit}
              className="flex flex-col justify-center"
            >
              <label className="text-sm font-medium">Username</label>
              <input
                className="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
                type="text"
                name="username"
                id="name-signup"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
              <label className="text-sm font-medium">Password</label>
              <input
                className="
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
                type="password"
                name="password"
                placeholder="********"
                id="password-login"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <button
                className="px-4 py-1.5 rounded-md shadow-lg bg-sky-600 font-medium text-gray-100 block hover:bg-sky-700 transition duration-300"
                type="submit"
              >
                <span id="login_process_state" className="hidden">
                  Checking ...
                </span>
                <span id="login_default_state">Signup</span>
              </button>
            </form>
          )}

          <button
            className="mt-[10px] px-4 py-1.5 w-full rounded-md shadow-lg bg-orange-600 font-medium text-gray-100 block hover:bg-sky-700 transition duration-300"
            onClick={() => {
              if (currentPage == "login") {
                setCurrentPage("signup");
              } else {
                setCurrentPage("login");
              }
            }}
          >
            <span id="login_process_state" className="hidden">
              Checking ...
            </span>
            {currentPage == "login" ? (
              <span id="login_default_state">Sign Up Instead</span>
            ) : (
              <span id="login_default_state">Login Instead</span>
            )}
          </button>
        </div>
      </section>
    </>
    // <div className="login-signup-page">
    // <div className="auth-container">
    //   {/* Login Form */}
    //   <div className="form login-form">
    //     <h2>Login</h2>
    //     <form onSubmit={handleLoginSubmit}>
    //       <div className="form-group">
    //         <label htmlFor="name-login">Name:</label>
    //         <input
    //           className="form-input"
    //           type="text"
    //           id="name-login"
    //           value={loginName}
    //           onChange={(e) => setLoginName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="password-login">Password:</label>
    //         <input
    //           className="form-input"
    //           type="password"
    //           id="password-login"
    //           value={loginPassword}
    //           onChange={(e) => setLoginPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <button className="btn" type="submit">
    //           Login
    //         </button>
    //       </div>
    //     </form>
    //   </div>

    //   {/* Signup Form */}
    //   <div className="form signup-form">
    //     <h2>Signup</h2>
    //     <form onSubmit={handleSignupSubmit}>
    //       <div className="form-group">
    //         <label htmlFor="name-signup">Name:</label>
    //         <input
    //           className="form-input"
    //           type="text"
    //           id="name-signup"
    //           value={signupName}
    //           onChange={(e) => setSignupName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       {/* Uncomment if email is needed */}
    //       {/* <div className="form-group">
    //         <label htmlFor="email-signup">Email:</label>
    //         <input
    //           className="form-input"
    //           type="email"
    //           id="email-signup"
    //           value={signupEmail}
    //           onChange={(e) => setSignupEmail(e.target.value)}
    //         />
    //       </div> */}
    //       <div className="form-group">
    //         <label htmlFor="password-signup">Password:</label>
    //         <input
    //           className="form-input"
    //           type="password"
    //           id="password-signup"
    //           value={signupPassword}
    //           onChange={(e) => setSignupPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <button className="btn" type="submit">
    //           Signup
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    // </div>
  );
};

export default Login;
