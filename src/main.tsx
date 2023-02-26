import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./views/App";

import "./views/styles/common.css";
import "./views/styles/reset.css";
import "./views/styles/var.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
