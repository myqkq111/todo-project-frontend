import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

function FindID() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // 찾은 아이디 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/find-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("사용자 정보를 찾을 수 없습니다.");
      }

      const data = await response.json();
      setUserId(data.username); // 서버에서 받은 아이디 설정
    } catch (error) {
      console.error("아이디 찾기 오류:", error.message);
      setUserId(""); // 오류 발생 시 아이디 초기화
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          아이디 찾기
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex items-center">
            <AiOutlineMail className="absolute w-6 h-6 text-gray-400 left-3" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            아이디 찾기
          </button>
        </form>
        {userId && ( // userId가 있을 때만 아이디 출력
          <div className="text-center text-black">
            <p className="font-bold">찾은 아이디: {userId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FindID;
