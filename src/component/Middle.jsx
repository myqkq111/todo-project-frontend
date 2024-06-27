import { AiFillCheckCircle, AiOutlineSync, AiFillStar } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Middle({ handleIconClick }) {
  return (
    <>
      <div className="icons flex justify-around px-4 mt-8">
        <button className="icon-button icon-current" onClick={handleIconClick}>
          <AiOutlineClose className="text-3xl" title="미완료" />
        </button>
        <button
          className="icon-button icon-recurring"
          onClick={handleIconClick}
        >
          <AiOutlineSync className="text-3xl" title="주기적인 일" />
        </button>
        <button
          className="icon-button icon-important"
          onClick={handleIconClick}
        >
          <AiFillStar className="text-3xl" title="중요한 일" />
        </button>
        <button className="icon-button icon-done" onClick={handleIconClick}>
          <AiFillCheckCircle className="text-3xl" title="완료" />
        </button>
      </div>
    </>
  );
}

export default Middle;
