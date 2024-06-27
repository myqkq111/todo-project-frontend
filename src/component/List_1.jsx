import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

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
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}
      <ul className="flex flex-col items-center">
        {todos
          .filter((todo) => todo.date === selectedDateString)
          .map((todo) => (
            <li
              key={todo.id}
              className="flex justify-center w-full mb-2 p-2 border-b border-gray-300 cursor-pointer"
              onClick={() => onSelectTodo(todo)}
              style={{ color: "black", fontWeight: "bold" }}
            >
              <span>{todo.event}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List1;
