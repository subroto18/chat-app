import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Login from "../pages/Login";

import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
      },
      {
        path: "", // Matches any path not explicitly defined
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Home />, // Your protected home component
          },
        ],
      },
      {
        path: "*", // Matches any path not explicitly defined
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Home />, // Your protected home component
          },
        ],
      },
    ],
  },
]);

export default router;
