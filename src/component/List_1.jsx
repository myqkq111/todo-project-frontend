import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineSync, AiFillStar } from "react-icons/ai"; // 주기적인 일과 중요한 일 아이콘 추가

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
        id: todos.length + 1,
        event: newTodo,
        date: selectedDateString,
        status: "미완료", // 기본 상태를 미완료로 설정
        recurring: false, // 기본 값으로 설정
        important: false, // 기본 값으로 설정
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setShowInput(false);
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
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
      )}
      <ul className="flex flex-col items-center">
        {todos
          .filter((todo) => todo.date === selectedDateString)
          .map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between w-full mb-2 p-2 border-b border-gray-300 cursor-pointer ${
                todo.status === "미완료" ? "text-black" : "text-gray-500"
              } font-bold`}
              onClick={() => onSelectTodo(todo)}
            >
              <span>{todo.event}</span>
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
