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

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('id_token');
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  function checkGameRoute() {
    const currentUrl = window.location.href;
    const splitUrl = currentUrl.split("/");
    const lastWord = splitUrl[splitUrl.length - 1];
    return lastWord === "game";
  }

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
