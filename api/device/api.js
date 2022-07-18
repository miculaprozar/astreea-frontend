import {device_url} from '../utils/consts.js';
import {sendGetRequest, sendPostRequest} from '../utils/network.js';

export default () => ({
  checkConnection: async () => {
    const {data} = await sendGetRequest(device_url + 'phoneCheck');
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
