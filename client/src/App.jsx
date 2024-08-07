import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('id_token'); // Remove token from local storage
    navigate('/'); // Redirect to home or login page
  };

  function checkGameRoute() {
    const currentUrl = window.location.href;
    const splitUrl = currentUrl.split("/");
    const lastWord = splitUrl[splitUrl.length - 1];
    return lastWord === "game"; // Changed to strict equality
  }

  // Check if the user is logged in
  const loggedIn = !!localStorage.getItem('id_token');

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-space-around">
        <header className="display-flex justify-space-between align-center p-2">
          <nav>
            {loggedIn ? (
              <button className="no-button" id="logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <div className="nav-links">
                  <a href="/" className="nav-link home-link">
                    Home
                  </a>
                  <a href="/signup" className="nav-link signup-link">
                    Login/Signup
                  </a>
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
    </ApolloProvider>
  );
};

export default App;
