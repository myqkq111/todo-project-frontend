import React, { useState } from "react";

function List2({ todo, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.event);

  const handleDelete = () => {
    // 삭제 로직을 추가하세요
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

  return (
    <div className="relative p-5 pt-5 bg-white text-black rounded-lg">
      <div className="mb-5">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyPress={handleTitleKeyPress}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-full p-2 text-2xl mb-5 border border-gray-300 rounded"
          />
        ) : (
          <div
            className="text-2xl mb-5 font-bold cursor-pointer"
            onClick={handleEditTitle}
          >
            {todo.event}
          </div>
        )}
        <div className="mb-5">D-4 | 만료일 2024-06-24</div>
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
