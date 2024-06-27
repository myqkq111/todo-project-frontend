import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";

function FindID() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/find-id", {
        email,
      });
      setUsername(response.data.username);
      setError("");
    } catch (error) {
      setError("사용자를 찾을 수 없습니다.");
      setUsername("");
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
        {username && (
          <p className="text-center text-green-500 mt-4">아이디: {username}</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default FindID;
