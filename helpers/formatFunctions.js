export const kwhRenderer = (charge) => {
  return charge.length === 0 || charge.endKwh === null
    ? '-- kWh'
    : (charge.endKwh - charge.startKwh).toFixed(2) + ' kWh';
};

export const priceRenderer = (charge, price, curency) =>
  charge.length === 0 || charge.endKwh === null
    ? '-- '
    : (price * (charge.endKwh - charge.startKwh)).toFixed(2) + ' ' + curency;

const differenceDates = (startDate, endDate) => {
  var diffMs = endDate - startDate; // milliseconds between now & Christmas
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  return `${diffHrs}h ${diffMins}m`;
};

export const hourMinutesRenderer = (charge) =>
  charge.length === 0 || charge.endKwh === null
    ? '-h -m'
    : differenceDates(new Date(charge.startDate), new Date(charge.endDate));
