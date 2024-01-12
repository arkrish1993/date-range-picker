/**
 * @name getFormattedDate
 * @description This function takes a date and returns it in yyyy-mm-dd format.
 * @returns {string}
 */
export const getFormattedDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  }`;
};

/**
 * @name getSelectedRange
 * @description This function returns the selected range in a specified format.
 * @returns {array}
 */
export const getSelectedRange = (startDate, endDate) => {
  return [startDate, endDate];
};

/**
 * @name isWeekend
 * @description This function checks if a date is a weekend.
 * @returns {boolean}
 */
export const isWeekend = (date) => {
  const currentDate = new Date(date);
  return currentDate.getDay() === 0 || currentDate.getDay() === 6;
};

/**
 * @name getWeekends
 * @description This function returns the weekends within the selected date range.
 * @returns {array}
 */
export const getWeekends = (startDate, endDate) => {
  const weekends = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    if (isWeekend(currentDate)) {
      weekends.push(getFormattedDate(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
};

/**
 * @name getCommaSeparatedData
 * @description This function takes an array and returns it in comma-separated format.
 * @returns {string}
 */
export const getCommaSeparatedData = (values) => {
  return values.toString().replaceAll(",", ", ");
};

/**
 * @name validateDateRange
 * @description This function validates the date range and returns proper error, if needed.
 * @returns {string}
 */
export const validateDateRange = (startDate, endDate) => {
  if (startDate > endDate) {
    return "Start date cannot be before the end date.";
  } else if (startDate === endDate) {
    return "Please choose a range.";
  } else if (isWeekend(startDate)) {
    return "Please select a week day as the start date.";
  } else if (isWeekend(endDate)) {
    return "Please select a week day as the end date.";
  }
  return "";
};
