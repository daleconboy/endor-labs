/**
 * Welcome! Please make all changes under ./App.tsx.
 * and unhide the component below.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Instructions } from "./Instructions";
import { App } from "./App";
import "./style.css";
import { worker } from "../data";

// handle mock data
worker.start();

// mount the application
const root = createRoot(document.getElementById("app")!);
root.render(
  <StrictMode>
    <Instructions />
    <App />
  </StrictMode>
);
