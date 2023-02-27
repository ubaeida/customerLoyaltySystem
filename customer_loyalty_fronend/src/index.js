import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NotificationCTX from "./context/AlertContext";
import Authentication from "./context/AuthContext";
import  HeadTitleContext  from "./context/TitleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HeadTitleContext>
      <Authentication>
        <NotificationCTX>
          <App />
        </NotificationCTX>
      </Authentication>
    </HeadTitleContext>
  </BrowserRouter>
);
