//프로필수정코드

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:3000/api/users/update",
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
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="새로운 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
