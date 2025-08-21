import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";
import App from "./App.tsx";

if (process.env.NODE_ENV === "production") disableReactDevTools();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
