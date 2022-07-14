import {device_url} from '../utils/consts.js';
import {sendGetRequest, sendPostRequest} from '../utils/network.js';

export default () => ({
  checkConnection: async () => {
    const {data} = await sendGetRequest(device_url + 'phoneCheck');
    return data;
  },
});
