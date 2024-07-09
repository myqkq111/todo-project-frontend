import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Header({
  dropdownValue,
  searchCategory,
  handleDropdownChange,
  handleSearchCategoryChange,
  isLoggedIn,
  handleLogout,
  handleDelete, // 추가: 회원 탈퇴 기능 핸들러
  handleTodolistClick,
  handleIconClick,
  handleUpdateSuccess,
}) {
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputRef.current.value.trim() === "") {
        alert("검색어를 입력해주세요.");
        return;
      }
      handleIconClick(selectRef.current.value, inputRef.current.value);
    }
  };

  return (
    <header className="App-header bg-dark text-dark w-full py-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <h1
            className="text-2xl font-bold tracking-wide"
            onClick={handleTodolistClick}
          >
            TodoList
          </h1>
          <select
            disabled={!isLoggedIn}
            value={dropdownValue}
            onChange={handleDropdownChange}
            className="px-3 py-2 border border-gray-400 rounded-md text-sm bg-white text-black h-10"
          >
            <option value="전체">전체</option>
            <option value="일상">일상</option>
            <option value="직장">직장</option>
          </select>
        </div>
        <div className="flex items-center gap-4 mt-2">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="text-sm tracking-wide">
                로그아웃
              </button>
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="text-sm tracking-wide"
              >
                회원 탈퇴
              </button>
              <Link to="/update" className="text-sm tracking-wide">
                회원정보 수정
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm tracking-wide border border-white rounded-md py-2 px-4"
            >
              로그인
            </Link>
          )}
          <div className="controls flex gap-4 items-center mt-2">
            <div className="relative flex items-center">
              <select
                disabled={!isLoggedIn}
                ref={selectRef}
                value={searchCategory}
                onChange={handleSearchCategoryChange}
                className="absolute left-0 top-0 h-10 px-3 py-2 border border-gray-400 rounded-l-md text-sm bg-white text-black"
                style={{ width: "120px" }}
              >
                <option value="전체 검색">전체 검색</option>
                <option value="일상 검색">일상 검색</option>
                <option value="직장 검색">직장 검색</option>
              </select>
              <input
                disabled={!isLoggedIn}
                ref={inputRef}
                type="text"
                placeholder="검색"
                className="pl-32 pr-3 py-2 border border-gray-400 rounded-r-md text-sm bg-white text-black h-10 text-right text-xs "
                onKeyDown={(event) => handleKeyPress(event)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
