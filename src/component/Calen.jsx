import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 유지

function Calen({ handleDateClick, todos }) {
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const hasTodo = todos.some((todo) => todo.date === dateString);
      if (hasTodo) {
        return (
          <div className="bg-yellow-200 rounded-full w-2 h-2 mx-auto mt-1"></div> // 파스텔 톤, 크기 조정 및 간격 추가
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-container relative mb-1 bg-white text-black shadow-md rounded-md ">
      <Calendar
        className="w-full border-none"
        onClickDay={handleDateClick}
        tileContent={tileContent}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            const hasTodo = todos.some((todo) => todo.date === dateString);
            return hasTodo ? "relative" : "";
          }
          return "";
        }}
      />
    </div>
  );
}

export default Calen;
