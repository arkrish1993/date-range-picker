import React, { useEffect, useState } from "react";
import "./DateRangePicker.css";

const getFormattedDate = (date) => {
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  }`;
};

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (!!startDate && !!endDate) {
      setIsInvalid(startDate > endDate);
    }
  }, [startDate, endDate]);

  const getSelectedRange = () => {
    return JSON.stringify([startDate, endDate]);
  };

  const getWeekends = () => {
    const weekends = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      const day = currentDate.getDay();
      if (day === 0 || day === 6) {
        weekends.push(getFormattedDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return JSON.stringify(weekends);
  };

  return (
    <div>
      <div className="date-range-container">
        <div className="date-range-start">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            value={startDate}
          />
        </div>
        <div className="date-range-end">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            value={endDate}
          />
        </div>
      </div>
      {!!startDate && !!endDate && !isInvalid ? (
        <div>Selected date range values: {getSelectedRange()}</div>
      ) : null}
      {!!startDate && !!endDate && isInvalid ? (
        <div>Invalid date range selected.</div>
      ) : null}
      {!!startDate && !!endDate && !isInvalid ? (
        <div>Weekends within the selected date range: {getWeekends()}</div>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
