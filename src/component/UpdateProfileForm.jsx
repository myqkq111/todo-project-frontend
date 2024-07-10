//프로필수정코드

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const UpdateProfileForm = ({ user, onUpdateSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user ? user.username : "");
  const [newEmail, setNewEmail] = useState(user ? user.email : "");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.put(
        "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000/api/users/update",
        { newUsername, newEmail, currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      // onUpdateSuccess(); // 업데이트 성공 시 콜백 호출
      console.log("hi");
      alert("프로필이 수정되었습니다!"); // 수정 완료 알림창
      navigate("/login");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.status === 401) {
        alert("현재 비밀번호가 올바르지 않습니다."); // 서버에서 반환한 오류 메시지 처리
      } else {
        alert("프로필 업데이트 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          프로필 수정
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <AiOutlineUser className="absolute w-6 h-6 text-black left-3" />
            <input
              type="text"
              placeholder="새로운 사용자 이름"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative flex items-center">
            <AiOutlineUser className="absolute w-6 h-6 text-black left-3" />
            <input
              type="email"
              placeholder="새로운 이메일"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative flex items-center">
            <AiOutlineLock className="absolute w-6 h-6 text-black left-3" />
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative flex items-center">
            <AiOutlineLock className="absolute w-6 h-6 text-black left-3" />
            <input
              type="password"
              placeholder="새로운 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            프로필 수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
