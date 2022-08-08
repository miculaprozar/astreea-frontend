export const kwhRenderer = (charge) => {
  return !charge || charge?.length === 0 || charge?.endKwh === null
    ? '-- kWh'
    : (charge.endKwh - charge.startKwh).toFixed(2) + ' kWh';
};

export const priceRenderer = (charge, price, curency) =>
  !charge || charge?.length === 0 || charge?.endKwh === null
    ? '-- '
    : (price * (charge.endKwh - charge.startKwh)).toFixed(2) + ' ' + curency;

const differenceDates = (startDate, endDate) => {
  var diffMs = endDate - startDate; // milliseconds between now & Christmas
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  return `${diffHrs}h ${diffMins}m`;
};
export const realTimeDifference = (startDate, endDate) => {
  if (startDate === null || endDate === null) return '--';

  var diffMs = endDate - startDate; // milliseconds between now & Christmas
  const secs = Math.floor(Math.abs(diffMs) / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60); // seconds
  return `${hours % 24}h ${mins % 60}m ${secs % 60}s`;
};

export const formatMs = (diffMs) => {
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  return `${diffHrs}h ${diffMins}m`;
};

export const hourMinutesRenderer = (charge) =>
  !charge || charge?.length === 0 || charge?.endKwh === null
    ? '-h -m'
    : differenceDates(new Date(charge.startDate), new Date(charge.endDate));

export const isCharging = (charger) => {
  return charger.stateId === 1;
};
