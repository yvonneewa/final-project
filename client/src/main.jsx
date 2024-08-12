import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";

import auth from "./utils/auth.js";
import Dead from "./pages/Dead.jsx";
import Escape from "./pages/Escape.jsx";
import Donation from "./pages/Donation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Login />,
      },
      {
        path: "/gameover",
        element: <Dead />,
      },
      {
        path: "/escaped",
        element: <Escape />,
      },
      {
        path: "/game",
        loader: () => (!auth.loggedIn() ? redirect("/signup") : null),
        element: <Game />,
      },

      {
        path: "/donation",
        element: <Donation />,
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
