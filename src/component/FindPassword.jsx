import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import axios from "axios";

function FindPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/find-password", {
        username,
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        setMessage("비밀번호 재설정 실패: " + error.response.data.error);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        setMessage("서버로부터 응답을 받지 못했습니다.");
      } else {
        console.error("Error setting up the request:", error.message);
        setMessage("요청 설정 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          비밀번호 찾기
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
            <AiOutlineMail className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            비밀번호 찾기
          </button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default FindPassword;
