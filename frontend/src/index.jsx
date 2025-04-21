import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import App from "./App";  // Import App component
import "./index.css";  // Import your styles

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>  {/* Wrap App with BrowserRouter for routing */}
    <App />
  </BrowserRouter>
);
