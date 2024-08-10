import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Login from "./pages/Login";

import auth from "./utils/auth.js";
import Dead from "./pages/Dead.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      {
        path: "/signup",
        element: <Login />,
      },
      {
        path: "/gameover",
        element: <Dead />,
      },
      {
        path: "/game",
        loader: () => (!auth.loggedIn() ? redirect('/signup') : null),
        element: <Game />,
      },
      // {
      //   path: "/profiles/:profileId",
      //   element: <Profile />,
      // },
      // {
      //   path: "/me",
      //   element: <Profile />,
      // },
      // {
      //   path: "/StorySection",
      //   element: <StorySection />,
      // },
      // {
      //   path: "/choices",
      //   element: <Choices />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
