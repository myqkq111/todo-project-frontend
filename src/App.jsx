import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiFillCheckCircle, AiOutlineSync, AiFillStar } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import List1 from "./List_1";
import List2 from "./List_2";
import "./App.css"; // 커스텀 스타일을 불러옵니다

function App() {
  const [value, setValue] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState("전체");
  const [searchCategory, setSearchCategory] = useState("전체 검색");
  const [currentView, setCurrentView] = useState("calendar"); // 'calendar', 'list1', 'list2'
  const [selectedTodo, setSelectedTodo] = useState(null); // 선택된 할일
  const [selectedDate, setSelectedDate] = useState(new Date()); // 기본값을 현재 날짜로 설정

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleIconClick = () => {
    setSelectedDate(new Date()); // 아이콘 클릭 시 선택된 날짜를 현재 날짜로 설정
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
    setSelectedDate(new Date()); // 기본값을 현재 날짜로 설정
    setCurrentView("calendar");
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
          <div className="controls flex gap-4 items-center mt-2">
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
                className="pl-32 pr-3 py-2 border border-gray-400 rounded-r-md text-sm bg-white text-black h-10 text-right text-xs"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="content flex flex-col gap-10 mt-20 mx-auto max-w-screen-lg p-4">
        {currentView === "calendar" && (
          <>
            <div className="icons flex justify-around px-4 mt-8">
              <button
                className="icon-button icon-current"
                onClick={handleIconClick}
              >
                <AiOutlineClose className="text-3xl" title="현재" />
              </button>
              <button
                className="icon-button icon-recurring"
                onClick={handleIconClick}
              >
                <AiOutlineSync className="text-3xl" title="주기적인 일" />
              </button>
              <button
                className="icon-button icon-important"
                onClick={handleIconClick}
              >
                <AiFillStar className="text-3xl" title="중요한 일" />
              </button>
              <button
                className="icon-button icon-done"
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
          <div className="modal">
            <List1
              date={selectedDate}
              onSelectTodo={handleSelectTodo}
              onBack={handleBackToCalendar}
            />
          </div>
        )}
        {currentView === "list2" && selectedTodo && (
          <div className="modal">
            <List2 todo={selectedTodo} onBack={handleBackToList1} />
          </div>
        )}
      </div>
      {(currentView === "list1" || currentView === "list2") && (
        <div className="modal-overlay" onClick={handleBackToCalendar}></div>
      )}
    </div>
  );
}

export default App;
