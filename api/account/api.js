import {api_url} from '../utils/consts.js';
import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
  sendDeleteRequest,
} from '../utils/network.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => ({
  forgotPassword: async (email) => {
    const {data} = await sendPostRequest(
      api_url + 'ast/api/v1/user/forgotPassword',
      email,
    );
    return data;
  },
  register: async (userInfo) => {
    const {data} = await sendPostRequest(
      api_url + 'ast/api/v1/user/signUp',
      userInfo,
    );
    return data;
  },
  login: async (userInfo) => {
    const {data} = await sendPostRequest(
      api_url + 'ast/api/v1/user/logIn',
      userInfo,
    );
    return data;
  },
  updateUser: async (token, userInfo) => {
    const {data} = await sendPutRequest(
      api_url + 'ast/api/v1/user/changePassword',
      userInfo,
      token,
    );

    return data;
  },

  changePassword: async (token, userInfo) => {
    const {data} = await sendPutRequest(
      api_url + 'ast/api/v1/user',
      userInfo,
      token,
    );

    return data;
  },
  getSpecificUser: async (token) => {
    const {data} = await sendGetRequest(
      api_url + 'ast/api/v1/user/specificUser',
      token,
    );

    return data;
  },
  getUserCharger: async (token) => {
    const {data} = await sendGetRequest(api_url + 'ast/api/v1/charger', token);
    return data;
  },
  addExistingChargerToUser: async (token, serialNumber) => {
    const {data} = await sendPostRequest(
      api_url + 'ast/api/v1/charger',
      {
        serialNumber: serialNumber,
        name: "Frank's Charger",
        firmwareVersion: 'buna',
        hwRevision: 'mnah',
        mechanicalRevision: 'este',
        latitude: 3.11123,
        longitude: 2.22,
        address: 'strada mea',
        price: 4.2,
        currency: 'euro',
        stateId: 1,
      },
      token,
    );
    return data;
  },

  removeExistingChargerFromUser: async (token) => {
    const {data} = await sendDeleteRequest(
      api_url + 'ast/api/v1/charger/15',
      token,
    );
    return data;
  },
});
