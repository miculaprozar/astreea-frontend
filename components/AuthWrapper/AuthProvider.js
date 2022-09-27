import React, { useState, useMemo, useEffect, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import startSignalRConnection from "./startSignalRConnection";
import axios from "axios";
import base64 from "react-native-base64";
import {
  ADB2C_TENANT,
  ADB2C_POLICY,
  ADB2C_CLIENT,
  ADB2C_REDIRECT_URI,
  ADB2C_POLICY_EDIT_PROFILE,
  ADB2C_POLICY_PASSWORD_RESET,
} from "../../api/utils/consts";

import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { GATEWAY_URL } from "../../api/utils/consts";

const AuthContext = React.createContext();
const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [userName, setUserName] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(false);

  const getSearchParamFromURL = (url, param) => {
    const include = url.includes(param);

    if (!include) return null;

    const params = url.split(/([?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
  };

  // const startSignalRConnection = (authInfo) => {
  //   const connectionSignalR = new HubConnectionBuilder()
  //     .configureLogging(LogLevel.Critical)
  //     .withUrl(GATEWAY_URL, {
  //       accessTokenFactory: () => authInfo.accessToken,
  //       skipNegotiation: true,
  //       transport: HttpTransportType.WebSockets,
  //     })
  //     .build();
  //   setConnection(connectionSignalR);
  // };

  const initAuth = async () => {
    let codeResponse = await WebBrowser.openAuthSessionAsync(
      `https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`,
      ADB2C_REDIRECT_URI,
      { showInRecents: true }
    ); // sign-in & sign-up
    let code;
    console.log(codeResponse)
    try {
      code = getSearchParamFromURL(codeResponse.url, "code");
    } catch (e) {
      console.log(e);
      // initAuth();
    }
    // console.log(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/token?grant_type=authorization_code&client_id=${ADB2C_CLIENT}&code=${code}&claim=given_name&claim=family_name`)
    let tokenResponse = await axios.post(
      `https://astreeacharger.b2clogin.com/astreeacharger.onmicrosoft.com/B2C_1_astreeacharger_signin/oauth2/v2.0/token?grant_type=authorization_code&client_id=27c0b46b-a394-470c-9c5b-8005206bdce6&code=eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..xTPdzVmFClEOMNJN.jC_kXW3CCXVLXYfDd6Pg2GfwZeH2xVhvW25ZXL76dpWDY6yKJmLQmErDOTNe1rIJnIlQFte7EkGOs3G24TkR_K2gG_7Qhfkf54ci4nayft1sNUXDYj_GY4-J-suqy6hhyhP1KMJnCbVs5ezt_YPF8behS0XSmO37_DXJME7kouCl1PV_UfYyarvHabPcvytPigrVkgUOruXfo1Uqu9oSnFkY8yKilZy5Xn0FzbMaxy5A6Ji1kFonVJ5q_MtzdEz5HQe3B63AopC6i3NkEnejoWDOCcAdAq9S7zMy8TRoU1AO1NGC3gQYsTV7tRcUxjEWjDo8zEz8BD3Tr7n7KajOIPCcJA95znnnc5Y4yEdzP8Hws3Kg2QrAyuocFEtaCaGOAwkh0PXNgFlTOWTNOZ1m6IKaaRNlbC0-rKJUPApd7ysZ8UfGG8E16BOlh3HX-QWA6LUJJDKo5qzX_HIrC25GsSUk504rH8BiMgdMu4-A3UBq25G5K5p2yAKQEC-mG7JdMaR5iUE_2mz0gNB2cL0tL06kDnsJuqKFpmoeVildXqbFyOdMhQA1mn1baRgQOUMiEPy_H_itXUcijIlgm47qc7Pn9Q1of9ExOltwgw.SYBcI5d7E34hs_1dc_AFHw&claim=given_name&claim=family_name`
    ); // get token
    let userInfo = {};
    try {
      userInfo = base64.decode(tokenResponse.data.profile_info);
      console.log(userInfo);
      let name = JSON.parse(userInfo).name;
      setUserName(name);
    } catch (e) {
      console.log(e);

      // initAuth();
    }

    var authenticationFunctionUrl =
      "https://csmsgatewayauthorization.azurewebsites.net/api/negotiate?key=SMI_8CPajAfaxRYD0sB0PV-VQA_A5-76OHYZbD955tbxAzFuTwklsg==";
    const authInfo = await axios.get(authenticationFunctionUrl);
    startSignalRConnection(authInfo, setConnectionStatus);

    setToken(tokenResponse.data.id_token);
    setIsloading(false);
  };

  const initLogOut = async () => {
    setIsloading(true);
    // const logOutResponse = await axios.get(
    // 	`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/logout?post_logout_redirect_uri=${ADB2C_REDIRECT_URI}`
    // ); // logo
    const logOutResponse = await WebBrowser.openAuthSessionAsync(
      `https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/logout?post_logout_redirect_uri=${ADB2C_REDIRECT_URI}`,
      ADB2C_REDIRECT_URI
    ); // logout

    setToken(null);
    setIsloading(false);
  };

  const initEditProfile = async () => {
    await WebBrowser.openAuthSessionAsync(
      `https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY_EDIT_PROFILE}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`,
      ADB2C_REDIRECT_URI
    );
  };

  const initResetPassword = async () => {
    await WebBrowser.openAuthSessionAsync(
      `https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY_PASSWORD_RESET}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`,
      ADB2C_REDIRECT_URI
    );
  };

  useEffect(() => {
    if (token === null && !isLoading) {
      setIsloading(true);
      const myTimeout = setTimeout(() => initAuth(), 1000);
    }
  }, [token, isLoading]);

  const appContextValue = useMemo(
    () => ({
      token,
      connectionStatus,
      initAuth,
      initLogOut,
      initEditProfile,
      initResetPassword,
      isLoading,
      userName,
    }),
    [token, isLoading, connectionStatus, userName]
  );

  return (
    <AuthContext.Provider value={appContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
