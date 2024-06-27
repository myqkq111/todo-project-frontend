import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // CSS 파일 import

const FilterCalender = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mb-5 text-lg font-bold">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default FilterCalender;
