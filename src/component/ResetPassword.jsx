// 이것도 내가추가한 컴포넌트

import React, { useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassword({ match }) {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/reset-password/${token}`,
        { username, newPassword }
      );
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
      setMessage("비밀번호 재설정에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          비밀번호 재설정
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex items-center">
            <AiOutlineUser className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative flex items-center">
            <AiOutlineLock className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="password"
              placeholder="새로운 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative flex items-center">
            <AiOutlineLock className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="password"
              placeholder="새로운 비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            비밀번호 재설정
          </button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
