import { device_url, api_url } from "../utils/consts.js";
import { sendGetRequest, sendPostRequest } from "../utils/network.js";

export default () => ({
  checkConnection: async () => {
    const { data } = await sendGetRequest(device_url + "phoneCheck");
    return data;
  },
  getChargerData: async (deviceSerialNumber, token) => {
    const { data } = await sendGetRequest(
      api_url + "ast/api/v1/charger/" + deviceSerialNumber,
      token
    );
    return data;
  },

  getTotalChargingData: async (deviceId, token, dates) => {
    let datesFilterQueryParams = "/";
    if (dates) {
      datesFilterQueryParams = `?startDate=${dates.requestStartDate}&endDate=${dates.requestEndDate}`;
    }

    const { data } = await sendGetRequest(
      api_url +
        "ast/api/v1/charging/total/" +
        deviceId +
        datesFilterQueryParams,
      token
    );
    return data;
  },
  startStopCharging: async (chargerData, token) => {
    const { data } = await sendPostRequest(
      api_url + "ast/api/v1/charging/",
      chargerData,
      token
    );
    return data;
  },
  chargerHistory: async (chargerId, page, perPage, token, dates) => {
    let datesFilterQueryParams = "";
    if (dates) {
      datesFilterQueryParams = `&startDate=${dates.splitStartDate}&endDate=${dates.splitEndDate}`;
    }
    const { data } = await sendGetRequest(
      api_url +
        `ast/api/v1/charging/${chargerId}?page=${page}&perPage=${perPage}${datesFilterQueryParams}`,
      token
    );

    return data;
  },

  availableWifiNetowrks: async () => {
    const { data } = await sendGetRequest(device_url + "availableWifiNetowrks");
    return data;
  },

  setupDevice: async (wifiName, wifiPassword, uid) => {
    const { data } = await sendPostRequest(device_url + "configure", {
      ssid: wifiName,
      password: wifiPassword,
      uid: uid,
    });
    return data;
  },
});
