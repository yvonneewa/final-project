import React from "react";
import Auth from "./utils/auth";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  function checkGameRoute() {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    const splitUrl = currentUrl.split("/");
    console.log(splitUrl);

    const lastWord = splitUrl[splitUrl.length - 1];
    console.log(lastWord);

    return lastWord == "game";
  }

  return (
    <div className="flex-column justify-space-around">
      <header className="display-flex justify-space-between align-center p-2">
        <nav>
          {Auth.loggedIn() ? (
            <button className="no-button" id="logout">
              Logout
            </button>
          ) : (
            // <Link to="/login">Login</Link>
            <>
               <div className="nav-links">
              <a href="/" className="nav-link home-link">Home</a>
              <a href="/signup" className="nav-link signup-link">Login/Signup</a>
            </div>
            </>
          )}
        </nav>
        {checkGameRoute() ? (
          <progress className="progress is-medium" value="60" max="100">
            60%
          </progress>
        ) : null}
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
