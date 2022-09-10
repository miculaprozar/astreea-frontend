import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TextInput } from "react-native";
import Account from "./Views/Account/Account";
import ConnectQR from "./Views/ConnectQR/ConnectQR";
import ChargerSettings from "./Views/ChargerSettings/ChargerSettings";
import ConnectDevice from "./Views/ConnectDevice/ConnectDevice";
import DeviceDetails from "./Views/DeviceDetails/DeviceDetails";
import SetupDevice from "./Views/SetupDevice/SetupDevice";
import Home from "./Views/Home/Home";
import ForgotPassword from "./Views/ForgotPassword/ForgotPassword";
import RessetPassword from "./Views/RessetPassword/RessetPassword";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";
import Permision from "./Views/Permision/Permision";
import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { AuthProvider } from 'ad-b2c-react-native';
import * as WebBrowser from 'expo-web-browser';
import base64 from 'react-native-base64'

import {
  JsonHubProtocol,
  HubConnectionState,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import axios from "axios";

import startSignalRConnection from "./startSignalRConnection";

import routes from "./routes";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import Websocket from "./Views/WebSocket/Websocket";

import { Provider } from "./provider/Provider";

const Stack = createNativeStackNavigator();
export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_600SemiBold,
  });

  startSignalRConnection();

  const prefix = Linking.createURL("/");
  const linking = {
    prefixes: [prefix],
  };
  console.log(prefix)
  const getSearchParamFromURL = (url, param) => {
    const include = url.includes(param)

    if (!include) return null

    const params = url.split(/([?,=])/)
    const index = params.indexOf(param)
    const value = params[index + 2]
    return value
  }
  const conf = {
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const tenant = 'testdigitalgarden';
  const policy = 'B2C_1_TestDigitalGarden';
  const client = '68c8731f-e491-4151-a9d8-10e8dd2ecdba';
  const redirectUri = 'exp://localhost:8081';
  const getCodeAuth = async () => {
    /*  Linking.openURL(`https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}/oauth2/v2.0/authorize?client_id=${client}&response_type=code+id_token&redirect_uri=${redirectUri}&response_mode=query&scope=openid`).then(x => console.log("GEREEE: ", x)); */
    /* await axios.get(`https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}/oauth2/v2.0/authorize?
      client_id=${client}
      &response_type=code+id_token
      &redirect_uri=${redirectUri}
      &response_mode=query
      &scope=openid`, conf).then(x => console.log(x.data)); */
    let codeResponse = await WebBrowser.openAuthSessionAsync(`https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}/oauth2/v2.0/authorize?client_id=${client}&response_type=code+id_token&redirect_uri=${redirectUri}&response_mode=query&scope=openid`, redirectUri);
    console.log("HEEEEREEEE: ", codeResponse);
    let code = getSearchParamFromURL(codeResponse.url, 'code')

    let tokenResponse = await axios.post(`https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${policy}/oauth2/v2.0/token?grant_type=authorization_code&client_id=${client}&code=${code}&claim=given_name`);
    console.log(tokenResponse.data);
    let tokenId = tokenResponse.data.id_token;
    let decoded = base64.decode(tokenResponse.data.profile_info);
    console.log(decoded)
  }

  useEffect(() => {
    getCodeAuth();
  })

  return (
    <Provider>
      <NavigationContainer /* linking={linking} */ >
        {/*  <AuthProvider
          tenant="testdigitalgarden"
          appId="68c8731f-e491-4151-a9d8-10e8dd2ecdba"
          loginPolicy="B2C_1_TestDigitalGarden"
          redirectURI="exp://localhost:8081" //redirect uri
        > */}
        <Stack.Navigator initialRouteName="Permissions">
          <Stack.Screen
            name={routes.SignIn.name}
            options={routes.SignIn.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <SignIn {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.ForgotPassword.name}
            options={routes.ForgotPassword.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <ForgotPassword {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.RessetPassword.name}
            options={routes.RessetPassword.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <RessetPassword {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.SignUp.name}
            options={routes.SignUp.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <SignUp {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.Home.name}
            options={routes.Home.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <Home {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.Account.name}
            options={routes.Account.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <Account {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.ConnectQR.name}
            options={routes.ConnectQR.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <ConnectQR {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.ConnectDevice.name}
            options={routes.ConnectDevice.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <ConnectDevice {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.SetupDevice.name}
            options={routes.SetupDevice.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <SetupDevice {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.DeviceDetails.name}
            options={routes.DeviceDetails.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <DeviceDetails {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.ChargerSettings.name}
            options={routes.ChargerSettings.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <ChargerSettings {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.Permision.name}
            options={routes.Permision.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? <Permision {...props} /> : <Text>Loading...</Text>
            }
          </Stack.Screen>
        </Stack.Navigator>
        {/*  </AuthProvider> */}
      </NavigationContainer>
    </Provider >
  );
}
