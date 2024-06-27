import React, { useState, useEffect } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from "react-icons/ai";

function List2({ todo, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.event);
  const [newDate, setNewDate] = useState(todo.date);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDate, setRecurringDate] = useState(todo.date);
  const [recurringPeriod, setRecurringPeriod] = useState("");
  const [memo, setMemo] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setNewDate(todo.date);
  }, [todo]);

  const handleDelete = () => {
    alert("삭제되었습니다.");
    onBack();
  };

  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === "Enter") {
      todo.event = newTitle;
      setIsEditing(false);
    }
  };

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleRecurringToggle = () => {
    setIsRecurring(!isRecurring);
  };

  const handleRecurringDateChange = (e) => {
    setRecurringDate(e.target.value);
  };

  const handleRecurringPeriodChange = (e) => {
    setRecurringPeriod(e.target.value);
  };

  const calculateNextDate = (startDate, period) => {
    if (!period) return "";
    let nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + parseInt(period, 10));
    return nextDate.toISOString().split("T")[0];
  };

  return (
    <div className="relative p-5 pt-5 bg-dark text-black rounded-lg">
      <div className="flex justify-between items-center mb-7 text-align; center">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="bg-transparent border-none text-2xl cursor-pointer"
        >
          {isFavorite ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            <AiOutlineStar />
          )}
        </button>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyPress={handleTitleKeyPress}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-3/4 p-2 text-2xl mb-5 border border-gray-300 rounded"
          />
        ) : (
          <div
            className="text-2xl mb-5 font-bold cursor-pointer"
            onClick={handleEditTitle}
          >
            {newTitle}
          </div>
        )}
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className="bg-transparent border-none text-2xl cursor-pointer"
        >
          {isCompleted ? (
            <AiFillCheckCircle className="text-green-500" />
          ) : (
            <AiOutlineCheckCircle />
          )}
        </button>
      </div>
      <div className="flex justify-between mb-5 text-2xl font-bold">
        <span>
          D{" "}
          {Math.ceil((new Date(newDate) - new Date()) / (1000 * 60 * 60 * 24))}
        </span>
        <input
          type="date"
          value={newDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded"
        />
      </div>
      <div className="space-y-6">
        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={handleRecurringToggle}
            className="mr-2"
          />
          <span>주기적인 일</span>
        </div>
        {isRecurring && (
          <div className="space-y-4">
            <div className="mb-2">
              <span>날짜 : </span>
              <input
                type="date"
                value={recurringDate}
                onChange={handleRecurringDateChange}
                className="border border-gray-300 rounded"
              />
            </div>
            <div>
              <span>반복 기간 : </span>
              <input
                type="number"
                value={recurringPeriod}
                onChange={handleRecurringPeriodChange}
                className="border border-gray-300 rounded"
              />
            </div>
            <div className="mt-2">
              <span>
                예정일 :{" "}
                {calculateNextDate(recurringDate, recurringPeriod)
                  .split("-")
                  .join(" - ")}
              </span>
            </div>
          </div>
        )}

        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모"
          className="w-full p-2 text-sm border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-between mt-5">
        <button
          onClick={handleDelete}
          className="bg-gray-800 text-white border-none py-2 px-4 rounded cursor-pointer text-lg hover:bg-gray-900"
        >
          삭제
        </button>
        <button
          onClick={onBack}
          className="bg-gray-800 text-white border-none py-2 px-4 rounded cursor-pointer text-lg hover:bg-gray-900"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default List2;
