import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";

import Example from "./Example.tsx";
import Meituan from "./Meituan.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Meituan />
    <Example />
  </React.StrictMode>,
);
