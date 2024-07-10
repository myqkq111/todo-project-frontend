import React, { useState } from "react";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import FilterCalender from "./FilterCalender";
import axios from "axios";

function FilterView({
  date,
  onSelectTodo,
  onBack,
  list1Value,
  list1Name,
  handleIconClick,
}) {
  function completed(userId, completed) {
    axios
      .put(
        "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000/api/filter/completed",
        {
          userId: userId,
          completed: completed,
        }
      )
      .then((res) => {
        handleIconClick(list1Name);
      })
      .catch((error) => {
        console.error("Error occurred on fetching", error);
      });
  }

  function isImportant(userId, isImportant) {
    axios
      .put(
        "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000/api/filter/isImportant",
        {
          userId: userId,
          isImportant: isImportant,
        }
      )
      .then((res) => {
        handleIconClick(list1Name);
      })
      .catch((error) => {
        console.error("Error occurred on fetching", error);
      });
  }

  return (
    <div className="relative p-5 pt-5 bg-white text-black rounded-lg">
      <div className="flex justify-center">
        <span className="inline-block px-3 py-1 mb-3 text-xl font-bold bg-gray-200 rounded-lg text-center">
          {list1Name}
        </span>
      </div>
      <FilterCalender date={date} />
      <div className="mb-10">
        {list1Value
          //   .filter(
          //     (event) => !date || event.date === date.toISOString().split("T")[0]
          //   )
          .map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b border-gray-300"
              onClick={() => onSelectTodo(event)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  completed(event.userId, event.completed);
                }}
                className="bg-transparent border-none text-2xl cursor-pointer"
              >
                {event.completed ? (
                  <BsCheckCircleFill className="text-black" />
                ) : (
                  <BsCircle />
                )}
              </button>
              <span>{event.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isImportant(event.userId, event.isImportant);
                }}
                className="bg-transparent border-none text-2xl cursor-pointer"
              >
                {event.isImportant ? (
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

export default FilterView;
