import React, { useEffect, useRef, useState } from "react";
import {
  getCommaSeparatedData,
  getSelectedRange,
  getWeekends,
} from "./utils/DateRangeUtils";
import "./DateRangePicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const endDateRef = useRef(null);

  useEffect(() => {
    if (!!startDate && !!endDate) {
      setIsInvalid(startDate >= endDate);
      if (startDate > endDate) {
        setErrorMessage("Start date cannot be before the end date.");
      } else if (startDate === endDate) {
        setErrorMessage("Please choose a range.");
      }
    }
  }, [startDate, endDate]);

  /**
   * @name getValues
   * @description This function returns an array with the following data:
   * 1. The selected range.
   * 2. The weekends within the selected date range.
   */
  const getValues = () => {
    const range = getSelectedRange(startDate, endDate);
    const weekends = getWeekends(startDate, endDate);
    return [range, weekends];
  };

  const [range, weekends] = getValues();

  return (
    <div className="main-container">
      <h3>Date Range Picker</h3>
      <div className="date-range-container">
        {/* Start date picker */}
        <div className="date-range-start">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            onChange={(e) => {
              setStartDate(e.target.value);
              endDateRef.current.showPicker();
            }}
            value={startDate}
          />
        </div>
        {/* End date picker */}
        <div className="date-range-end">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            ref={endDateRef}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            value={endDate}
          />
        </div>
      </div>

      {/* Display section */}
      {!!startDate && !!endDate && isInvalid ? (
        <div className="date-range-error">{errorMessage}</div>
      ) : null}
      {!!startDate && !!endDate && !isInvalid ? (
        <div>
          <span>Selected date range values: </span>
          <div className="date-range-display-container">
            {getCommaSeparatedData(range)}
          </div>
        </div>
      ) : null}
      {!!startDate && !!endDate && !isInvalid ? (
        <div>
          <span>Weekends within the selected date range: </span>
          <div className="date-range-display-container">
            {getCommaSeparatedData(weekends)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
