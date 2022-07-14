import { api_url } from "../utils/consts.js";
import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from "../utils/network.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => ({
  checkedIfLogged: async (email) => {
    const { data } = await sendGetRequest(
      api_url + "ast/api/v1/user/signUp" + email
    );
    return data;
  },
  register: async (userInfo) => {
    const { data } = await sendPostRequest(
      api_url + "ast/api/v1/user/signUp",
      userInfo
    );
    return data;
  },
  login: async (userInfo) => {
    const { data } = await sendPostRequest(
      api_url + "ast/api/v1/user/logIn",
      userInfo
    );
    return data;
  },
  updateUser: async (token, userInfo) => {
    const { data } = await sendPutRequest(
      api_url + "ast/api/v1/user",
      userInfo,
      token
    );

    return data;
  },
  getUserCharger: async (token) => {
    const { data } = await sendGetRequest(
      api_url + "ast/api/v1/charger",
      token
    );
    return data;
  },
});
