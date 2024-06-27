import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = ({ user, onUpdateSuccess, onLogout }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
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
        "http://localhost:3000/update",
        { newUsername, newEmail, currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      onUpdateSuccess(newUsername, newEmail, newPassword); // 업데이트 성공 시 콜백 호출
      alert("프로필이 수정되었습니다!"); // 수정 완료 알림창
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.status === 401) {
        alert("현재 비밀번호가 올바르지 않습니다."); // 서버에서 반환한 오류 메시지 처리
      } else {
        alert("프로필 업데이트 중 오류가 발생했습니다.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout"); // 서버의 로그아웃 엔드포인트 호출
      localStorage.removeItem("token"); // 클라이언트의 토큰 삭제
      onLogout(); // 로그아웃 처리 완료 후 부모 컴포넌트에서 상태 업데이트를 통해 로그아웃 처리
      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Logout failed", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="새로운 아이디"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="새로운 이메일"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          프로필 업데이트
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
