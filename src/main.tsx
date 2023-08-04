import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// https://github.com/remix-run/react-router/blob/dev/examples

import "./index.css";

import App from "./App.tsx";
import Shop from "./Shop.tsx";
import Meituan from "./Meituan.tsx";
import Example from "./Example.tsx";
import Itt from "./Itt.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Itt,
  },
  {
    path: "/app",
    Component: App,
  },
  {
    path: "/example",
    Component: Example,
  },
  {
    path: "/meituan",
    Component() {
      return (
        <>
          <Shop />
          <Meituan />
        </>
      );
    },
  },
]);

function Rootrouter() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <br />
    <br />
    <Rootrouter />
  </React.StrictMode>,
);
