import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfileForm from "./UpdateProfileForm";
import { useNavigate } from "react-router-dom";

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
        // 에러 처리 예: 로그인 페이지로 리다이렉트 또는 에러 메시지 표시
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateSuccess = async (newUsername, newEmail, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("프로필이 수정되었습니다!"); // 수정 완료 알림창

      // 로그아웃 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // 사용자 정보 초기화
    navigate("/login"); // 로그인 페이지로 이동
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
