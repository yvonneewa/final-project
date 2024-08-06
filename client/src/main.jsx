import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Signup from "./pages/Signup";
import Login from "./pages/Login";




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
        element: <Signup />,
      },
      {
        path: "/game",
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
