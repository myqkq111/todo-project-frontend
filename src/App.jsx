import { useRef } from "react";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import List1 from "./component/List_1";
import List2 from "./component/List_2";
import IconList from "./component/IconList";
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
  const [todos, setTodos] = useState([]);
  const [list1Value, setList1Value] = useState([]);
  const [list1Name, setList1Name] = useState([]);
  const navigate = useNavigate();
  const catRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

  const handleTodolistClick = () => {
    const cat = catRef.current;
    cat.style.display = "block";
    cat.style.animation = "moveCat 5s linear";
    setTimeout(() => {
      cat.style.display = "none";
      cat.style.animation = "none";
    }, 5000);
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleIconClick = (event, typing) => {
    setSelectedDate(new Date());
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
      case "전체 검색":
        axios
          .get(`http://localhost:3000/api/filter?category=all&typing=${typing}`)
          .then((res) => {
            setList1Value(res.data);
          })
          .catch((error) => {
            console.error("Error occurred on fetching", error);
          });
        break;
      case "일상 검색":
        axios
          .get(
            `http://localhost:3000/api/filter?category=dailyLife&typing=${typing}`
          )
          .then((res) => {
            setList1Value(res.data);
          })
          .catch((error) => {
            console.error("Error occurred on fetching", error);
          });
        break;
      case "직장 검색":
        axios
          .get(
            `http://localhost:3000/api/filter?category=workPlace&typing=${typing}`
          )
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
    setCurrentView("iconList");
  };

  const handleBackToCalendar = () => {
    setSelectedTodo(null);
    setSelectedDate(new Date());
    setCurrentView("calendar");
  };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      // 서버로 로그아웃 요청을 보냄
      await axios.post("http://localhost:3000/api/users/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("token");

      // 기타 클라이언트 측 로직 추가: 예를 들어 인증 상태 변경 등
      setIsLoggedIn(false);
      navigate("/");
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleDelete = async () => {
    console.log("Delete button clicked");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.delete(
        "http://localhost:3000/api/users/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response received:", response.data);
      alert(response.data.message); // 회원 탈퇴 성공 알림창

      localStorage.removeItem("token");
      setIsLoggedIn(false); // 사용자 정보 초기화
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        console.error("Error:", error.message);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
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
        setTodos={setTodos} // setTodos 함수를 Header 컴포넌트에 전달
        handleLogout={handleLogout}
        handleDelete={handleDelete}
        handleTodolistClick={handleTodolistClick} // 핸들러 추가
        handleIconClick={handleIconClick}
      />
      <div className="content flex flex-col gap-10 mt-20 mx-auto max-w-screen-lg p-4">
        {currentView === "calendar" && (
          <>
            <Middle handleIconClick={handleIconClick} />
            <Calen handleDateClick={handleDateClick} todos={todos} />
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
            <List2
              todo={selectedTodo}
              onBack={handleBackToList1}
              handleSelectTodo={handleSelectTodo}
            />
          </div>
        )}
        {currentView === "iconList" && (
          <IconList
            todos={list1Value}
            onSelectTodo={handleSelectTodo}
            list1Name={list1Name}
          />
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
      <img ref={catRef} src="/cat.PNG" className="cat" alt="cat" />

      {/* 프로필 페이지 라우트 설정 */}
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
