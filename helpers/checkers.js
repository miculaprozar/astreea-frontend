// export const hasLastCharge = (charger) => {
//   return charger.lastCharge && charger.lastCharge.length > 0;
// };

// export const getUniqueKey = (charger) => {
//   return hasLastCharge(charger)
//     ? 'charger_last' + charger.lastCharge[0].id
//     : 'charger' + charger.id;
// };

export const hasLastCharge = (charger) => {
  return charger.lastChargingSession ? true : false;
  // return charger.lastCharge && charger.lastCharge.length > 0;
};

export const getUniqueKey = (charger) => {
  return hasLastCharge(charger)
    ? "charger_last" + charger.lastChargingSession.chargingSessionId
    : "SerialNumberCon" + charger.SerialNumberCon;
};
