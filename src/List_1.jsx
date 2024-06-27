import React, { useState } from "react";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar, AiOutlinePlus } from "react-icons/ai";

function List1({ date, onSelectTodo, onBack }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      event: "스키마 만들기",
      date: "2024-06-24",
      completed: false,
      favorite: false,
    },
    {
      id: 2,
      event: "데이터베이스 설정",
      date: "2024-06-24",
      completed: false,
      favorite: true,
    },
    {
      id: 3,
      event: "API 통합",
      date: "2024-06-25",
      completed: true,
      favorite: false,
    },
    {
      id: 4,
      event: "프론트엔드 디자인",
      date: "2024-06-25",
      completed: false,
      favorite: false,
    },
  ]);

  const toggleComplete = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  const toggleFavorite = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, favorite: !event.favorite } : event
      )
    );
  };

  return (
    <div className="relative p-5 pt-5 bg-white text-black rounded-lg">
      <button
        onClick={() => alert("추가 기능이 구현되지 않았습니다.")}
        className="absolute top-2 right-2 bg-transparent border-none text-2xl cursor-pointer"
      >
        <AiOutlinePlus />
      </button>
      <div className="mb-5 text-lg font-bold">
        <span>
          {date ? date.toISOString().split("T")[0] : "No Date Selected"}
        </span>
      </div>
      <div className="mb-10">
        {events
          .filter(
            (event) => !date || event.date === date.toISOString().split("T")[0]
          )
          .map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center p-2 border-b border-gray-300"
              onClick={() => onSelectTodo(event)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComplete(event.id);
                }}
                className="bg-transparent border-none text-2xl cursor-pointer"
              >
                {event.completed ? (
                  <BsCheckCircleFill className="text-black" />
                ) : (
                  <BsCircle />
                )}
              </button>
              <span>{event.event}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(event.id);
                }}
                className="bg-transparent border-none text-2xl cursor-pointer"
              >
                {event.favorite ? (
                  <AiFillStar className="text-yellow-500" />
                ) : (
                  <AiOutlineStar />
                )}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default List1;
