import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header({
  dropdownValue,
  searchCategory,
  handleDropdownChange,
  handleSearchCategoryChange,
  isLoggedIn,
  handleLogout,
  setTodos, // setTodos 함수 추가
}) {
  const handleCategoryChange = (event) => {
    // Dropdown의 선택된 값을 전달
    handleDropdownChange(event);

    // 선택된 카테고리에 해당하는 할일 목록을 다시 불러오는 로직 추가
    axios
      .get(`http://localhost:3000/api/todos/category/${event.target.value}`)
      .then((res) => {
        // 받아온 데이터 처리
        setTodos(res.data); // 할일 목록을 App 컴포넌트에서 관리하는 state로 업데이트
      })
      .catch((error) => {
        console.error("할일 목록 불러오기 오류:", error);
      });
  };

  return (
    <header className="App-header bg-dark text-dark w-full py-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide">TodoList</h1>
          <select
            value={dropdownValue}
            onChange={handleCategoryChange}
            className="px-3 py-2 border border-gray-400 rounded-md text-sm bg-white text-black h-10"
          >
            <option value="전체">전체</option>
            <option value="일상">일상</option>
            <option value="직장">직장</option>
          </select>
        </div>
        <div className="flex items-center gap-4 mt-2">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white">
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="text-white">
              로그인
            </Link>
          )}
          <div className="controls flex gap-4 items-center mt-2">
            <div className="relative flex items-center">
              <select
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
                type="text"
                placeholder="검색"
                className="pl-32 pr-3 py-2 border border-gray-400 rounded-r-md text-sm bg-white text-black h-10 text-right text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
