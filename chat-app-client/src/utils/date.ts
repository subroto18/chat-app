import moment from "moment";

export const CHAT_DATE_TIME_CALCULATION = (isoDate) => {
  const date = moment(isoDate);
  const today = moment();
  const diffDays = today.diff(date, "days");

  if (date.isSame(today, "day")) {
    // If the date is today, show the time with am/pm
    return date.format("h:mm A");
  } else if (diffDays <= 6) {
    // If the date is within the last 6 days, show the day of the week
    return date.calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      lastWeek: "dddd",
      sameElse: "MM/DD/YY",
    });
  } else {
    // If the date is more than 7 days ago, show the date in MM/DD/YY format
    return date.format("MM/DD/YY");
  }
};
