import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Chats from "../pages/Chats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "chats",
        element: <Chats />,
      },
    ],
  },
]);

export default router;
