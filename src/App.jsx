import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import List1 from "./component/List_1";
import List2 from "./component/List_2";
import "./App.css"; // 커스텀 스타일을 불러옵니다
import Header from "./component/Header";
import Middle from "./component/Middle";
import Calen from "./component/Calen";
import FilterView from "./component/FilterView";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  // const [value, setValue] = useState(new Date()); //캘린더에 필요한데 아직 사용 용도를 모르겠음
  const [dropdownValue, setDropdownValue] = useState("전체");
  const [searchCategory, setSearchCategory] = useState("전체 검색");
  const [currentView, setCurrentView] = useState("calendar"); // 'calendar', 'list1', 'list2'
  const [selectedTodo, setSelectedTodo] = useState(null); // 선택된 할일
  const [selectedDate, setSelectedDate] = useState(new Date()); // 기본값을 현재 날짜로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [list1Value, setList1Value] = useState([]);
  const [list1Name, setList1Name] = useState([]);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleIconClick = (event) => {
    setSelectedDate(new Date()); // 아이콘 클릭 시 선택된 날짜를 현재 날짜로 설정
    setCurrentView("filterView");
    setList1Name(event);
    switch (event) {
      case "미완료":
        axios
          .get("http://localhost:3000/api/filter/failedSchedule")
          .then((res) => {
            setList1Value(res.data);
          })
          .catch((error) => {
            console.error("Error occurred on fetching", error);
          });
        break;
      case "주기적인 일":
        axios
          .get("http://localhost:3000/api/filter/recurringEvent")
          .then((res) => {
            setList1Value(res.data);
          })
          .catch((error) => {
            console.error("Error occurred on fetching", error);
          });
        break;
      case "중요한 일":
        axios
          .get("http://localhost:3000/api/filter/isImportant")
          .then((res) => {
            setList1Value(res.data);
          })
          .catch((error) => {
            console.error("Error occurred on fetching", error);
          });
        break;
      case "완료":
        axios
          .get("http://localhost:3000/api/filter/completed")
          .then((res) => {
            setList1Value(res.data);
          })
          .catch((error) => {
            console.error("Error occurred on fetching", error);
          });
        break;
    }
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
              list1Value={list1Value}
            />
          </div>
        )}
        {currentView === "filterView" && (
          <div className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
            <FilterView
              date={selectedDate}
              onSelectTodo={handleSelectTodo}
              onBack={handleBackToCalendar}
              list1Value={list1Value}
              list1Name={list1Name}
              handleIconClick={handleIconClick}
            />
          </div>
        )}
        {currentView === "list2" && selectedTodo && (
          <div className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
            <List2 todo={selectedTodo} onBack={handleBackToList1} />
          </div>
        )}
      </div>
      {(currentView === "list1" ||
        currentView === "list2" ||
        currentView === "filterView") && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={handleBackToCalendar}
        ></div>
      )}
    </div>
  );
}

export default App;
