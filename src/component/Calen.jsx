import Calendar from "react-calendar";

function Calen({ handleDateClick }) {
  return (
    <div className="calendar-container relative mb-1 bg-dark text-dark shadow-md rounded-md p-4">
      <Calendar
        // onChange={setValue}
        // value={value}
        className="dark-mode w-full border-none"
        onClickDay={handleDateClick}
      />
    </div>
  );
}

export default Calen;
