// 내가 새로만든 컴포넌트

import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfileForm from "./UpdateProfileForm";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get("http://localhost:3000/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateSuccess = (newUsername, newEmail, newPassword) => {
    alert("프로필이 수정되었습니다!"); // 수정 완료 알림창
    handleLogout(); // 로그아웃 후 로그인 페이지로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // 사용자 정보 초기화
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.delete("http://localhost:3000/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert(response.data.message); // 회원 탈퇴 성공 알림창

      localStorage.removeItem("token");
      setUser(null); // 사용자 정보 초기화
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          사용자 프로필
        </h2>
        {user && (
          <UpdateProfileForm
            user={user}
            onUpdateSuccess={handleUpdateSuccess}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
