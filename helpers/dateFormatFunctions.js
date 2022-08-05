export const getFullMonthName = (date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[date.getMonth()];
};

export const getEndMonthDate = (date) => {
  const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return newDate;
};

export const getStartMonthDate = (date) => {
  const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return newDate;
};
