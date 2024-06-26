import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

function FindID() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직을 처리합니다.
    alert(`아이디 찾기 요청이 제출되었습니다: ${email}`);
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
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            아이디 찾기
          </button>
        </form>
      </div>
    </div>
  );
}

export default FindID;
