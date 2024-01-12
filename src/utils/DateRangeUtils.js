/**
 * @name getFormattedDate
 * @description This function takes a date and returns it in yyyy-mm-dd format.
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
 */
export const getSelectedRange = (startDate, endDate) => {
  return [startDate, endDate];
};

/**
 * @name getWeekends
 * @description This function returns the weekends within the selected date range.
 */
export const getWeekends = (startDate, endDate) => {
  const weekends = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const day = currentDate.getDay();
    if (day === 0 || day === 6) {
      weekends.push(getFormattedDate(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
};

/**
 * @name getCommaSeparatedData
 * @description This function takes an array and returns it in comma-separated format.
 */
export const getCommaSeparatedData = (values) => {
  return values.toString().replaceAll(",", ", ");
};
