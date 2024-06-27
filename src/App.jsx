import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import List1 from "./component/List_1";
import List2 from "./component/List_2";
import IconList from "./component/IconList"; // 경로 확인
import {
  AiFillCheckCircle,
  AiOutlineSync,
  AiFillStar,
  AiOutlineClose,
} from "react-icons/ai";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [value, setValue] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState("전체");
  const [searchCategory, setSearchCategory] = useState("전체 검색");
  const [currentView, setCurrentView] = useState("calendar");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, event: "설거지하기", date: "2024-06-25" },
    { id: 2, event: "빨래하기", date: "2024-06-25" },
    { id: 3, event: "공부하기", date: "2024-06-25" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    setDropdownValue("전체");
    setSearchCategory("전체 검색");
    setCurrentView("calendar");
    setSelectedTodo(null);
    setSelectedDate(new Date());
  }, [isLoggedIn]);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleIconClick = () => {
    setCurrentView("iconList");
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredTodos = todos.filter((todo) =>
      todo.event.toLowerCase().includes(keyword)
    );
    setTodos(filteredTodos);
  };

  return (
    <div className="App min-h-screen flex flex-col bg-dark text-dark transition-colors duration-300">
      <header className="App-header bg-dark text-dark w-full py-4 fixed top-0 left-0 z-50 shadow-md">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-wide">TodoList</h1>
            <select
              value={dropdownValue}
              onChange={handleDropdownChange}
              className="px-3 py-2 border border-gray-400 rounded-md text-sm bg-white text-black h-10"
            >
              <option value="전체">전체</option>
              <option value="일상">일상</option>
              <option value="직장">직장</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mt-2">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            ) : (
              <a href="/login" className="text-white ">
                login
              </a>
            )}
            <div className="controls flex gap-4 items-center">
              <div className="relative flex items-center">
                <select
                  value={searchCategory}
                  onChange={handleSearchCategoryChange}
                  className="absolute left-0 top-0 h-10 px-3 py-2 border border-gray-400 rounded-l-md text-sm bg-white text-black"
                  style={{ width: "120px" }}
                >
                  <option value="전체 검색">전체 검색</option>
                  <option value="일상 검색">일상 검색</option>
                  <option value="직장 검색">직장 검색</option>
                </select>
                <input
                  type="text"
                  placeholder="검색"
                  onChange={handleSearch}
                  className="pl-32 pr-3 py-2 border border-gray-400 rounded-r-md text-sm bg-white text-black h-10 text-right text-xs"
                  style={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="content flex flex-col gap-10 mt-20 mx-auto max-w-screen-lg p-4">
        {currentView === "calendar" && (
          <>
            <div className="icons flex justify-around px-4 mt-8">
              <button
                className="icon-button icon-current flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
                onClick={handleIconClick}
              >
                <AiOutlineClose className="text-3xl" title="미완료" />
              </button>
              <button
                className="icon-button icon-recurring flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
                onClick={handleIconClick}
              >
                <AiOutlineSync className="text-3xl" title="주기적인 일" />
              </button>
              <button
                className="icon-button icon-important flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
                onClick={handleIconClick}
              >
                <AiFillStar className="text-3xl" title="중요한 일" />
              </button>
              <button
                className="icon-button icon-done flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
                onClick={handleIconClick}
              >
                <AiFillCheckCircle className="text-3xl" title="완료" />
              </button>
            </div>
            <div className="calendar-container relative mb-1 bg-dark text-dark shadow-md rounded-md p-4">
              <Calendar
                onChange={setValue}
                value={value}
                className="dark-mode w-full border-none"
                onClickDay={handleDateClick}
              />
            </div>
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
