// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// mport "./index.css";

// ReaictDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
