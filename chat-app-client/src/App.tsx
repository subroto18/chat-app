import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

export default function App() {
  return (
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}
