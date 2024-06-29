import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from "react-icons/ai";
import axios from "axios";

function List2({ todo, onBack, handleSelectTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDate, setNewDate] = useState(todo.dueDate);
  const [calenDate, setCalenDate] = useState(new Date()); // calenDate의 초기 값 설정
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDate, setRecurringDate] = useState(todo.dueDate);
  const [recurringPeriod, setRecurringPeriod] = useState("");
  const [memo, setMemo] = useState("");
  const [isFavorite, setIsFavorite] = useState(todo.isImportant);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [dateDifference, setDateDifference] = useState("");

  const titleRef = useRef(null);
  const recurringEventRef = useRef(null);
  const regDateRef = useRef(null);
  const recurringPeriodRef = useRef(null);
  const dueDateRef = useRef(null);
  const memoRef = useRef(null);


  // 초기에 todo의 날짜를 설정
  useEffect(() => {
    setNewDate(todo.dueDate);
    setCalenDate(new Date(todo.dueDate));
    setRecurringDate(todo.dueDate);

    // 초기 dateDifference 계산
    const differenceInDays = Math.ceil(
      (new Date(todo.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    setDateDifference(differenceInDays);
  }, [todo]);

  // 달력 선택 시 실행되는 함수
  const handleCalendarChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setCalenDate(selectedDate);

    // newDate와 선택된 날짜 사이의 차이 계산
    const differenceInDays = Math.ceil(
      (selectedDate - new Date()) / (1000 * 60 * 60 * 24)
    );
    setDateDifference(differenceInDays);
  };

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
      todo.title = newTitle;
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

  function completed(userId, completed) {
    axios
      .put("http://localhost:3000/api/filter/completed", {
        userId: userId,
        completed: completed,
      })
      .then((res) => {
        setIsCompleted(!isCompleted);
      })
      .catch((error) => {
        console.error("Error occurred on fetching", error);
      });
  }

  function isImportant(userId, isImportant) {
    console.log(userId);
    console.log(isImportant);
    axios
      .put("http://localhost:3000/api/filter/isImportant", {
        userId: userId,
        isImportant: isImportant,
      })
      .then((res) => {
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.error("Error occurred on fetching", error);
      });
  }
  const update = () => {
    const title = titleRef.current.innerText;
    const recurringEvent = recurringEventRef.current.checked;
    let regDate;
    let recurringPeriod;
    let dueDate;
    const textMemo = memoRef.current.value;
    let updateDate = {
      userId : todo.userId,
      title : title,
      recurringEvent : recurringEvent,
      memo : textMemo
    };
    if(recurringEvent){
      regDate = regDateRef.current.value;
      recurringPeriod = recurringPeriodRef.current.value;
      dueDate = dueDateRef.current.innerText;
      console.log(regDate);
      console.log(dueDate);
      if(regDate.trim() === ''){
        alert('시작 날짜를 입력해주세요');
        return;
      }
      if(recurringPeriod.trim() === ''){
        alert('반복 기간을 입력해주세요');
        return;
      }
      updateDate = {...updateDate,regDate : regDate, recurringPeriod : recurringPeriod, dueDate : dueDate};
    }
    axios
      .put(`http://localhost:3000/api/todos/update`, updateDate)
      .then((res) => {
        console.log(res);
        // handleSelectTodo(res.data);
      })
      .catch((error) => {
        console.error("Error occurred on fetching", error);
      });

  }

  return (
    <div className="relative p-5 pt-5 bg-dark text-black rounded-lg">
      <div className="flex justify-between items-center mb-7">
        <button
          onClick={(event) => {
            isImportant(todo.userId, todo.isImportant);
          }}
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
            ref={titleRef}
            className="text-2xl mb-5 font-bold cursor-pointer"
            onClick={handleEditTitle}
          >
            {newTitle}
          </div>
        )}
        <button
          onClick={() => {
            completed(todo.userId, todo.completed);
          }}
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
          {dateDifference === 0
            ? "D-day"
            : `D${dateDifference >= 0 ? `+${dateDifference}` : `${dateDifference}`}`}
        </span>
        <input
          type="date"
          value={calenDate.toISOString().split("T")[0]} // 달력의 초기 값 설정
          onChange={handleCalendarChange} // 달력 값 변경 시 실행되는 함수
          className="border border-gray-300 rounded"
        />
      </div>
      <div className="space-y-6">
        <div className="flex items-center mb-5">
          <input
            ref={recurringEventRef}
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
                ref={regDateRef}
                type="date"
                value={recurringDate}
                onChange={handleRecurringDateChange}
                className="border border-gray-300 rounded"
              />
            </div>
            <div>
              <span>반복 기간 : </span>
              <input
                ref={recurringPeriodRef}
                type="number"
                value={recurringPeriod}
                onChange={handleRecurringPeriodChange}
                className="border border-gray-300 rounded"
              />
            </div>
            <div className="mt-2">
              <span>예정일 :</span>
              <span ref={dueDateRef}>
                {" "}
                {calculateNextDate(recurringDate, recurringPeriod)
                  .split("-")
                  .join("-")}
              </span>
            </div>
          </div>
        )}

        <textarea
          ref={memoRef}
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
          onClick={update}
          className="bg-gray-800 text-white border-none py-2 px-4 rounded cursor-pointer text-lg hover:bg-gray-900"
        >
          수정
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