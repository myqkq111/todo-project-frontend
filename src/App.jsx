import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import List1 from "./component/List_1";
import List2 from "./component/List_2";
import IconList from "./component/IconList"; // 경로 확인
import "./App.css"; // 커스텀 스타일을 불러옵니다
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
  const [list1Value, setList1Value] = useState([]);
  const [list1Name, setList1Name] = useState([]);

  useEffect(() => {
    setDropdownValue("전체");
    setSearchCategory("전체 검색");
    setCurrentView("calendar");
    setSelectedTodo(null);
    setSelectedDate(new Date());

    // API 호출로 초기 데이터 가져오기
    axios
      .get("http://localhost:3001/api/todos/list")
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
    setSelectedDate(new Date()); // 아이콘 클릭 시 선택된 날짜를 현재 날짜로 설정
    setCurrentView("iconList");
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
    const clickedDate = new Date(date); // 이벤트에서 날짜 값을 가져와 Date 객체로 변환
    const viewDate = new Date(date);
    clickedDate.setDate(clickedDate.getDate() + 1);
    // 원하는 날짜 포맷으로 변환
    const formattedDate = clickedDate.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식으로 변환
    const viewFormattedDate = viewDate.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식으로 변환
    setSelectedDate(viewFormattedDate);
    setCurrentView("list1");
    console.log(formattedDate);
    axios
      .get(`http://localhost:3001/api/todos?dueDate=${formattedDate}`)
      .then((res) => {
        setList1Value(res.data);
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
              todos={list1Value} // todos 상태를 List1 컴포넌트로 전달합니다.
              setTodos={setTodos} // setTodos 함수도 List1 컴포넌트로 전달합니다.
              list1Value={list1Value}
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
