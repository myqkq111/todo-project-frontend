import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./component/Login";
import Register from "./component/Register";
import FindID from "./component/FindID";
import FindPassword from "./component/FindPassword";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-id" element={<FindID />} />
        <Route path="/find-password" element={<FindPassword />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
