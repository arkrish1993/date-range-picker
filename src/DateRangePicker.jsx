import React, { useEffect, useState } from "react";
import "./DateRangePicker.css";

/**
 * @name getFormattedDate
 * @description This function takes a date and returns it in yyyy-mm-dd format.
 */
const getFormattedDate = (date) => {
  const day = date.getDate();
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

  /**
   * @name getSelectedRange
   * @description This function returns the selected range in a specified format.
   */
  const getSelectedRange = () => {
    return JSON.stringify([startDate, endDate]);
  };

  /**
   * @name getWeekends
   * @description This function returns the weekends within the selected date range.
   */
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
        {/* Start date picker */}
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
        {/* End date picker */}
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
      {/* Display section */}
      {!!startDate && !!endDate && isInvalid ? (
        <div>Start date cannot be before the end date.</div>
      ) : null}
      {!!startDate && !!endDate && !isInvalid ? (
        <div>Selected date range values: {getSelectedRange()}</div>
      ) : null}
      {!!startDate && !!endDate && !isInvalid ? (
        <div>Weekends within the selected date range: {getWeekends()}</div>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
