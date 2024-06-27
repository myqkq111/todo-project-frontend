import React from "react";

function IconList({ todos, onSelectTodo }) {
  return (
    <div
      className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-dark text-dark p-6 rounded-lg shadow-lg z-50"
      style={{ maxHeight: "400px", overflowY: "scroll" }}
    >
      <ul className="flex flex-col items-center">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between w-full mb-2 p-2 border-b border-gray-300 cursor-pointer"
            onClick={() => onSelectTodo(todo)}
            style={{ color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            <span style={{ marginRight: "5px" }}>{todo.date}</span>
            <span>{todo.event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IconList;
