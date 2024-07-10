import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfileForm from "./UpdateProfileForm";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Header 컴포넌트 import

const Profile = () => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get(
          "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const handleUpdateSuccess = () => {
    alert("프로필이 수정되었습니다!"); // 수정 완료 알림창
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  const handleDelete = async () => {
    console.log("Delete button clicked");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.delete(
        "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response.data);
      alert(response.data.message); // 회원 탈퇴 성공 알림창

      localStorage.removeItem("token");
      setUser(null); // 사용자 정보 초기화
      setIsLoggedIn(false);
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleDelete={handleDelete}
          // 필요한 다른 props도 전달
        />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          사용자 프로필
        </h2>
        <div className="w-10/12 mx-auto">
          {user && (
            <UpdateProfileForm
              user={user}
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
