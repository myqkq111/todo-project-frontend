import { AiFillCheckCircle, AiOutlineSync, AiFillStar } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Middle({ handleIconClick }) {
  return (
    <>
      <div className="icons flex justify-around px-4 mt-8">
        <button
          id="미완료"
          className="icon-button icon-current"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiOutlineClose className="text-3xl" title="미완료" />
        </button>
        <button
          id="주기적인 일"
          className="icon-button icon-recurring"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiOutlineSync className="text-3xl" title="주기적인 일" />
        </button>
        <button
          id="중요한 일"
          className="icon-button icon-important"
          onClick={(event) => {
            handleIconClick(event.currentTarget.id);
          }}
        >
          <AiFillStar className="text-3xl" title="중요한 일" />
        </button>
        <button
          id="완료"
          className="icon-button icon-done"
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
