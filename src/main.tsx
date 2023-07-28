import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";

import Shop from "./Shop.tsx";
import Meituan from "./Meituan.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <br />
    <br />
    <Shop />
    <br />
    <br />
    <Meituan />
  </React.StrictMode>,
);
