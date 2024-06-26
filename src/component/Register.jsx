import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

function Register() {
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameAvailable(null); // Reset availability check when username changes
  };

  const checkUsernameAvailability = () => {
    // 여기서 아이디 중복체크 로직을 추가하세요.
    // 예를 들어, API를 호출하여 아이디가 사용 가능한지 확인합니다.
    // 임시로, 사용 가능 여부를 랜덤하게 설정합니다.
    setIsUsernameAvailable(Math.random() > 0.5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직을 처리합니다.
    // 회원가입 성공 시 navigate('/login'); 호출하여 로그인 페이지로 이동합니다.
    navigate("/login");
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
