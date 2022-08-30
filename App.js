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
import {
  JsonHubProtocol,
  HubConnectionState,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import axios from "axios";

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
import { useEffect } from "react/cjs/react.production.min";

const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_600SemiBold,
  });

  const perfomConnection = (access_info) => {
    let connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("http://127.0.0.1:8099/csmsgateway", {
        // accessTokenFactory: () => access_info.accessToken,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    console.log("THe conection is:", connection);

    global.connection = connection;
  };

  perfomConnection();

  // useEffect(() => {
  // }, []);

  // const authenticationFunctionUrl =
  //   "https://csmsgatewayauthorization.azurewebsites.net/api/negotiate?key=SMI_8CPajAfaxRYD0sB0PV-VQA_A5-76OHYZbD955tbxAzFuTwklsg==";
  // axios
  //   .get(authenticationFunctionUrl)
  //   .then((response) => {
  //     console.log(response.data.url);
  //     console.log(response.data.accessToken);

  //     perfomConnection(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return (
    <Provider>
      <NavigationContainer>
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
      </NavigationContainer>
    </Provider>
  );
}
