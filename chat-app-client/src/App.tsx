import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
export default function App() {
  return <RouterProvider router={router} />;
}
