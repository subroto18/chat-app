import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import global from "global"; // Ensure global is imported

export default function App() {
  return (
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}
