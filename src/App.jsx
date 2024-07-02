import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import List1 from "./component/List_1";
import List2 from "./component/List_2";
import IconList from "./component/IconList";
import "./App.css";
import Header from "./component/Header";
import Middle from "./component/Middle";
import Calen from "./component/Calen";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [value, setValue] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState("전체");
  const [searchCategory, setSearchCategory] = useState("전체 검색");
  const [currentView, setCurrentView] = useState("calendar");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setDropdownValue("전체");
    setSearchCategory("전체 검색");
    setCurrentView("calendar");
    setSelectedTodo(null);
    setSelectedDate(new Date());

    // API 호출로 초기 데이터 가져오기
    axios
      .get("http://localhost:3000/api/todos/list")
      .then((res) => {
        setTodos(res.data); // 서버에서 받아온 할일 목록을 설정합니다.
      })
      .catch((error) => {
        console.error("할일 목록 불러오기 오류:", error);
      });
  }, [isLoggedIn]);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleIconClick = (event) => {
    setSelectedDate(new Date());
    setCurrentView("iconList");
    // handleIconClick의 로직 추가
  };

  const handleDateClick = (date) => {
    const clickedDate = new Date(date);
    const viewDate = new Date(date);
    clickedDate.setDate(clickedDate.getDate() + 1);
    const formattedDate = clickedDate.toISOString().split("T")[0];
    const viewFormattedDate = viewDate.toISOString().split("T")[0];
    setSelectedDate(viewFormattedDate);
    setCurrentView("list1");
    axios
      .get(`http://localhost:3000/api/todos?dueDate=${formattedDate}`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error("Error occurred on fetching", error);
      });
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App min-h-screen flex flex-col bg-dark text-dark transition-colors duration-300">
      <Header
        dropdownValue={dropdownValue}
        searchCategory={searchCategory}
        handleDropdownChange={handleDropdownChange}
        handleSearchCategoryChange={handleSearchCategoryChange}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        setTodos={setTodos} // setTodos 함수를 Header 컴포넌트에 전달
      />
      <div className="content flex flex-col gap-10 mt-20 mx-auto max-w-screen-lg p-4">
        {currentView === "calendar" && (
          <>
            <Middle handleIconClick={handleIconClick} />
            <Calen handleDateClick={handleDateClick} />
          </>
        )}
        {currentView === "list1" && (
          <div className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-dark text-dark p-6 rounded-lg shadow-lg z-50">
            <List1
              date={selectedDate}
              onSelectTodo={handleSelectTodo}
              onBack={handleBackToCalendar}
              todos={todos}
              setTodos={setTodos}
              dropdownValue={dropdownValue} // dropdownValue를 List1 컴포넌트에 전달
            />
          </div>
        )}
        {currentView === "list2" && selectedTodo && (
          <div className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-dark text-dark p-6 rounded-lg shadow-lg z-50">
            <List2 todo={selectedTodo} onBack={handleBackToList1} />
          </div>
        )}
        {currentView === "iconList" && (
          <IconList todos={todos} onSelectTodo={handleSelectTodo} />
        )}
      </div>
      {(currentView === "list1" ||
        currentView === "list2" ||
        currentView === "iconList") && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={handleBackToCalendar}
        ></div>
      )}
    </div>
  );
}

export default App;
