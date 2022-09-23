import { format } from "date-fns";

export const kwhRenderer = (lastChargingSession) => {
  // return !charge || charge?.length === 0 || charge?.endKwh === null
  //   ? "-- kWh"
  //   : (charge.endKwh - charge.startKwh).toFixed(2) + " kWh";

  return lastChargingSession
    ? lastChargingSession.chargedKWh + " kWh"
    : "-- kWh";
};

export const priceRenderer = (lastChargingSession) =>
  // !charge || charge?.length === 0 || charge?.endKwh === null
  //   ? "-- "
  //   : (price * (charge.endKwh - charge.startKwh)).toFixed(2) + " " + curency;
  lastChargingSession ? lastChargingSession.price : "-- ";

const differenceDates = (startDate, endDate) => {
  var diffMs = endDate - startDate; // milliseconds between now & Christmas
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  return `${diffHrs}h ${diffMins}m`;
};
export const realTimeDifference = (startDate, endDate) => {
  if (startDate === null || endDate === null) return "--";

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

const secondsInHoursAndMinutes = (seconds) => {
  const hoursAndMinutes = new Date(seconds * 1000).toISOString().slice(11, 16);
  const hoursAndMinutesRenderer =
    hoursAndMinutes.slice(0, 2) + "h " + hoursAndMinutes.slice(3, 5) + "s";
  return hoursAndMinutesRenderer;
};

export const hourMinutesRenderer = (lastChargingSession) =>
  // !charge || charge?.length === 0 || charge?.endKwh === null
  //   ? "-h -m"
  //   : differenceDates(new Date(charge.startDate), new Date(charge.endDate));
  lastChargingSession
    ? secondsInHoursAndMinutes(lastChargingSession.chargedTimeInSec)
    : "-h -m";

export const isCharging = (charger) => {
  return charger.stateId === 1;
};

export const chargeLastUsed = (charge) => {
  const { lastChargingSession, state } = charge;
  let lastUsed = "Never Used";

  if (lastChargingSession && lastChargingSession.endDate !== null) {
    lastUsed = "Last Use";
  }

  state === "Charging" && (lastUsed = "Charging");

  return lastUsed;
};

export const chargeDate = (charge) => {
  const { lastChargingSession, state } = charge;
  let chargeText = "";

  if (lastChargingSession && lastChargingSession.endDate !== null) {
    chargeText = format(new Date(lastChargingSession.endDate), "MM LLLL  p");
  }

  state === "Charging" && (chargeText = "Your charger running normal");

  return chargeText;
};
