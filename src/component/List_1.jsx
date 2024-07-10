import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineSync, AiFillStar } from "react-icons/ai";
import axios from "axios";
import { IoMdReturnLeft } from "react-icons/io";

function List1({ date, onSelectTodo, todos, setTodos, dropdownValue }) {
  const [newTodo, setNewTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [categori, setCategori] = useState(null);

  // 날짜 보정 함수
  const adjustDate = (date) => {
    let adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    return adjustedDate.toISOString().split("T")[0];
  };

  const selectedDateString = adjustDate(date);

  useEffect(() => {
    // 필요 시 todos를 사용하여 필터링 로직 추가
    filterTodos();
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []); // todos 또는 dropdownValue가 변경될 때마다 재필터링

  const filterTodos = () => {
    let filtered = todos.filter((todo) => {
      if (dropdownValue === "전체") {
        return true; // 모든 카테고리를 보여줌
      } else if (dropdownValue === "일상") {
        return todo.categori === 1;
      } else {
        return todo.categori === 0;
      }
    });
    //------------------------------------------------------------------------------------------------
    setTodos(filtered);
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      if (categori === null) {
        alert("카테고리를 선택해주세요.");
        return;
      }
      if (selectedDateString < new Date().toISOString().split("T")[0]) {
        alert("마감일을 확인해주세요.");
        return;
      }
      const newTodoItem = {
        title: newTodo,
        categori: categori,
        dueDate: selectedDateString,
      };
      axios
        .post(
          "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000/api/todos/new",
          newTodoItem
        )
        .then((res) => {
          setTodos([...todos, res.data]);
          setNewTodo("");
          setShowInput(false);
        })
        .catch((error) => {
          alert("이미 같은 제목의 할일이 존재합니다.");
          console.error("할일 생성 오류:", error);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="p-5 bg-dark text-dark rounded-lg">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold" style={{ color: "black" }}>
          {selectedDateString}
        </h2>
        <button
          onClick={() => setShowInput(true)}
          className="text-black bg-transparent border-none text-2xl"
        >
          <AiOutlinePlus />
        </button>
      </div>
      {showInput && (
        <div className="mt-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="새 할일 입력"
            className="w-full p-2 border rounded-md text-black"
          />
          <div className="mt-2">
            <button
              onClick={() => setCategori(1)}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
            >
              일상
            </button>
            <button
              onClick={() => setCategori(0)}
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
            >
              직장
            </button>
          </div>
        </div>
      )}
      <ul className="flex flex-col items-center">
        {/* {filteredTodos.map((todo, index) => (
           <li
             key={index}
             className="flex justify-center w-full mb-2 p-2 border-b border-gray-300 cursor-pointer"
             onClick={() => onSelectTodo(todo)}
             style={{ color: "black", fontWeight: "bold" }}
           >
             <span>{todo.title}</span>
           </li>
         ))} */}
        {todos
          // .filter((todo) => todo.date === selectedDateString)
          .map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between w-full mb-2 p-2 border-b border-gray-300 cursor-pointer ${
                todo.status === "미완료" ? "text-black" : "text-gray-500"
              } font-bold`}
              onClick={() => onSelectTodo(todo)}
            >
              <span>{todo.title}</span>
              <div className="flex items-center ml-2">
                {todo.recurring &&
                  (todo.status === "미완료" ? (
                    <AiOutlineSync className="text-yellow-500 ml-1" />
                  ) : (
                    <AiOutlineSync className="text-gray-300 ml-1" />
                  ))}{" "}
                {/* 주기적인 일 아이콘 */}
                {todo.important &&
                  (todo.status === "미완료" ? (
                    <AiFillStar className="text-red-500 ml-1" />
                  ) : (
                    <AiFillStar className="text-gray-300 ml-1" />
                  ))}{" "}
                {/* 중요한 일 아이콘 */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List1;
