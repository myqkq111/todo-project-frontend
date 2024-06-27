import React from "react";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import FilterCalender from "./FilterCalender";

function IconList({ onSelectTodo, todos, list1Name }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return (
    <div
      className="modal fixed top-1/2 left-1/2 w-10/12 max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-dark text-dark p-6 rounded-lg shadow-lg z-50"
      style={{ maxHeight: "400px", overflowY: "scroll" }}
    >
      <div className="flex justify-center mb-3">
        <span className="inline-block px-3 py-1 text-xl font-bold bg-white text-black rounded-lg text-center">
          {list1Name}
        </span>
      </div>
      <ul className="flex flex-col items-center">
        {todos
          //   .filter(
          //     (event) => !date || event.date === date.toISOString().split("T")[0]
          //   )
          .map((event, index) => (
            <li
              key={index}
              className="flex justify-between w-full mb-2 p-2 border-b border-gray-300 cursor-pointer"
              onClick={() => onSelectTodo(event)}
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <span style={{ marginRight: "5px" }}>
                {formatDate(event.dueDate)}
              </span>
              <span>{event.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default IconList;
