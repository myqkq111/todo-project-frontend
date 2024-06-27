import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import List1 from "./component/List_1";
import List2 from "./component/List_2";
import "./App.css";
import Header from "./component/Header";
import Middle from "./component/Middle";
import Calen from "./component/Calen";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Profile from "./component/Profile";

function App() {
  const [value, setValue] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState("전체");
  const [searchCategory, setSearchCategory] = useState("전체 검색");
  const [currentView, setCurrentView] = useState("calendar");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [list1Value, setList1Value] = useState([]);
  const [list1Name, setList1Name] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleIconClick = () => {
    setSelectedDate(new Date());
    setCurrentView("list1");
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setCurrentView("list1");
  };

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
    setCurrentView("list2");
  };

  const handleBackToList1 = () => {
    setSelectedTodo(null);
    setCurrentView("list1");
  };

  const handleBackToCalendar = () => {
    setSelectedTodo(null);
    setSelectedDate(new Date());
    setCurrentView("calendar");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token to be sent:", token);

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.delete("http://localhost:3000/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response from server:", response);

      localStorage.removeItem("token");
      setIsLoggedIn(false); // 로그인 상태 업데이트
      navigate("/login"); // 회원 탈퇴 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="App min-h-screen flex flex-col bg-dark text-dark transition-colors duration-300">
      <Header
        dropdownValue={dropdownValue}
        searchCategory={searchCategory}
        handleDropdownChange={handleDropdownChange}
        handleSearchCategoryChange={handleSearchCategoryChange}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleDelete={handleDelete} // handleDelete 함수 전달
      />
      <div className="content flex flex-col gap-10 mt-20 mx-auto max-w-screen-lg p-4">
        {currentView === "calendar" && (
          <>
            <Middle handleIconClick={handleIconClick} />
            <Calen handleDateClick={handleDateClick} />
          </>
        )}
        {currentView === "list1" && (
          <div className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
            <List1
              date={selectedDate}
              onSelectTodo={handleSelectTodo}
              onBack={handleBackToCalendar}
            />
          </div>
        )}
        {currentView === "list2" && selectedTodo && (
          <div className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
            <List2 todo={selectedTodo} onBack={handleBackToList1} />
          </div>
        )}
      </div>
      {(currentView === "list1" || currentView === "list2") && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={handleBackToCalendar}
        ></div>
      )}

      {/* 프로필 페이지 라우트 설정 */}
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
