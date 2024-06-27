import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

function List1({ date, onSelectTodo, todos, setTodos }) {
  const [newTodo, setNewTodo] = useState("");
  const [showInput, setShowInput] = useState(false);

  // 날짜 보정 함수
  const adjustDate = (date) => {
    let adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    return adjustedDate.toISOString().split("T")[0];
  };

  const selectedDateString = adjustDate(date);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        title: newTodo,
        contents: "", // 필요에 따라 추가 필드를 더 넣습니다.
        categori: "일상", // 예시: categori는 애플리케이션 로직에 따라 동적으로 할당하거나 하드코딩할 수 있습니다.
        dueDate: selectedDateString,
        userId: "667b7be3e4220d59f2d58835", // 예시: 실제 인증에서 얻은 사용자 ID로 교체합니다.
      };
      axios
        .post("http://localhost:3001/api/todos/new", newTodoItem)
        .then((res) => {
          setTodos([...todos, res.data]);
          setNewTodo("");
          setShowInput(false);
        })
        .catch((error) => {
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
        <div className="mb-5">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="새 할일 입력"
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}
      <ul className="flex flex-col items-center">
        {todos
          // .filter((todo) => todo.date === selectedDateString)
          .map((todo, index) => (
            <li
              key={index}
              className="flex justify-center w-full mb-2 p-2 border-b border-gray-300 cursor-pointer"
              onClick={() => onSelectTodo(todo)}
              style={{ color: "black", fontWeight: "bold" }}
            >
              <span>{todo.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List1;
