import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("아이디나 비밀번호를 다시 확인해주세요");
    }
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
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            아이디를 잊으셨나요?{" "}
            <Link to="/find-id" className="text-blue-500 hover:underline">
              아이디 찾기
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            비밀번호를 잊으셨나요?{" "}
            <Link to="/reset-password" className="text-blue-500 hover:underline">
              비밀번호 재설정
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


