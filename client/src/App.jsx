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
      localStorage.removeItem("id_token");
      navigate("/"); // Redirect to home or login page
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

  const loggedIn = !!localStorage.getItem("id_token");

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
          {checkGameRoute() ? null : null}
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
            <div>
              <a
                title="Donate to us"
                href="/donation"
                className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
              >
                <img
                  className="object-cover object-center w-full h-full rounded-full"
                  src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ApolloProvider>
  );
};

export default App;
