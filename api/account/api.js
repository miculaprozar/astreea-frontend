import { api_url } from "../utils/consts.js";
import { sendGetRequest, sendPostRequest } from "../utils/network.js";

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
});
