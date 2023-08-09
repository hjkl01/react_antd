import React from "react";

// https://github.com/remix-run/react-router/blob/dev/examples
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
// import Shop from "./Shop.tsx";
// import Meituan from "./Meituan.tsx";
// import Example from "./Example.tsx";
// import LoginForm from "./AntForm.tsx";
import Itt from "./Itt.tsx";
import Login from "./Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/itt/",
    Component: Itt,
  },
  {
    path: "/app/",
    Component: App,
  },
  // {
  //   path: "/example",
  //   Component: Example,
  // },
  // {
  //   path: "/meituan",
  //   Component() {
  //     return (
  //       <>
  //         <Shop />
  //         <Meituan />
  //       </>
  //     );
  //   },
  // },
  // {
  //   path: "/ant",
  //   Component: LoginForm,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <br />
    <br />
    <RouterProvider router={router} />;
  </React.StrictMode>,
);
