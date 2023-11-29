import React from "react";
import App from "./App";
import "./index.css";
import { worker } from "./mocks/worker";
import { createRoot } from "react-dom/client";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
