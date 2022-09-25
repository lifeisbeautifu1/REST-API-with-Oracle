import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StudentsContextProvider, SessionsContextProvider } from "./contexts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionsContextProvider>
        <StudentsContextProvider>
          <App />
        </StudentsContextProvider>
      </SessionsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
