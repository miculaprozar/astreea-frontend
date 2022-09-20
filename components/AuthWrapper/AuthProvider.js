import React, { useState, useMemo, useEffect, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import startSignalRConnection from './startSignalRConnection';
import axios from 'axios';
import base64 from 'react-native-base64';
import {
  ADB2C_TENANT,
  ADB2C_POLICY,
  ADB2C_CLIENT,
  ADB2C_REDIRECT_URI,
  ADB2C_POLICY_EDIT_PROFILE,
} from '../../api/utils/consts';

import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { GATEWAY_URL } from '../../api/utils/consts';

const AuthContext = React.createContext();
const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsloading] = useState(false);
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
      `https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`,
      ADB2C_REDIRECT_URI
    ); // sign-in & sign-up
    let code = getSearchParamFromURL(codeResponse.url, 'code');
    let tokenResponse = await axios.post(
      `https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/token?grant_type=authorization_code&client_id=${ADB2C_CLIENT}&code=${code}&claim=given_name&claim=family_name&claim=idp_access_token`
    ); // get token
    const userInfo = base64.decode(tokenResponse.data.profile_info);
    var authenticationFunctionUrl =
      'https://csmsgatewayauthorization.azurewebsites.net/api/negotiate?key=SMI_8CPajAfaxRYD0sB0PV-VQA_A5-76OHYZbD955tbxAzFuTwklsg==';
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
      isLoading,
    }),
    [token, isLoading, connectionStatus]
  );

  return (
    <AuthContext.Provider value={appContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
