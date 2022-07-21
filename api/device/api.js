import { device_url, api_url } from "../utils/consts.js";
import { sendGetRequest, sendPostRequest } from "../utils/network.js";

export default () => ({
  checkConnection: async () => {
    const { data } = await sendGetRequest(device_url + "phoneCheck");
    return data;
  },
  getTotalChargingData: async (deviceId, token) => {
    const { data } = await sendGetRequest(
      api_url + "ast/api/v1/charging/total/" + deviceId,
      token
    );
    return data;
  },
  startStopCharging: async (chargerData, token) => {
    const { data } = await sendPostRequest(
      api_url + "/ast/api/v1/charging/",
      chargerData,
      token
    );
    return data;
  },

  availableWifiNetowrks: async () => {
    const {data} = await sendGetRequest(device_url + 'availableWifiNetowrks');
    return data;
  },

  setupDevice: async (wifiName, wifiPassword) => {
    const {data} = await sendPostRequest(device_url + 'configure', {
      ssid: wifiName,
      password: wifiPassword,
    });
    return data;
  },
});
