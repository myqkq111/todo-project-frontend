import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./component/Login";
import Register from "./component/Register";
import FindID from "./component/FindID";
import Profile from "./component/Profile";
import ResetPassword from "./component/ResetPassword";
import FindPassword from "./component/FindPassword"; // 추가해야 할 부분

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-id" element={<FindID />} />
        <Route path="/find-password" element={<FindPassword />} /> {/* 수정된 부분 */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
