import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직을 처리합니다.
    navigate("/"); // 로그인 후 메인 페이지로 이동
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">로그인</h2>
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
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="/find-id" className="hover:underline">
            아이디 찾기
          </a>
          <a href="/find-password" className="hover:underline">
            비밀번호 찾기
          </a>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
