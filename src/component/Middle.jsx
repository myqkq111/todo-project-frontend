import { AiFillCheckCircle, AiOutlineSync, AiFillStar } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Middle({ handleIconClick }) {
  return (
    <>
      <div className="icons flex justify-around px-4 mt-8">
        <button
          className="icon-button icon-current flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
          id="미완료"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiOutlineClose className="text-3xl" title="미완료" />
        </button>
        <button
          className="icon-button icon-recurring flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
          id="주기적인 일"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiOutlineSync className="text-3xl" title="주기적인 일" />
        </button>
        <button
          className="icon-button icon-important flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
          id="중요한 일"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiFillStar className="text-3xl" title="중요한 일" />
        </button>
        <button
          className="icon-button icon-done flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110"
          id="완료"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiFillCheckCircle className="text-3xl" title="완료" />
        </button>
      </div>
    </>
  );
}

export default Middle;
