import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameAvailable(null); // Reset availability check when username changes
  };

  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/check-username/${username}`
      );
      setIsUsernameAvailable(!response.data.exists); // 서버에서 exists를 받도록 수정
    } catch (error) {
      console.error("Username check failed", error);
      alert("아이디 중복체크에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          username,
          password,
          email,
        }
      );
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          회원가입
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex items-center">
            <AiOutlineUser className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={checkUsernameAvailability}
              className="absolute right-0 px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 right-5"
            >
              중복체크
            </button>
          </div>
          {isUsernameAvailable !== null && (
            <div
              className={`text-sm ${
                isUsernameAvailable ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUsernameAvailable
                ? "사용 가능한 아이디입니다."
                : "이미 사용 중인 아이디입니다."}
            </div>
          )}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
          <div className="relative flex items-center">
            <AiOutlineLock className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="password"
              placeholder="비밀번호 확인"
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
            회원가입
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
