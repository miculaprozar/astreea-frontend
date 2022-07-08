import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Accordion, Block } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";
import Home from "./Views/Home/Home";
import Account from "./Views/Account/Account";
import ConnectDeviceStep1 from "./Views/ConnectDeviceStep1/ConnectDeviceStep1";
import ConnectDeviceStep2 from "./Views/ConnectDeviceStep2/ConnectDeviceStep2";
import SetupDevice from "./Views/SetupDevice/SetupDevice";
import ChargerSettings from "./Views/ChargerSettings/ChargerSettings";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import Websocket from "./Views/WebSocket/Websocket";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_600SemiBold,
  });

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="Websocket"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
          >
            {(props) =>
              fontsLoaded ? (
                <Websocket {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name="SignIn"
            options={{
              headerShown: false,
            }}
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
            name="SignUp"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },
              headerShadowVisible: false,
              headerTintColor: "#FF6400",
            }}
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
            name="Home"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
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
            name="Account"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
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
            name="ConnectDeviceStep1"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
          >
            {(props) =>
              fontsLoaded ? (
                <ConnectDeviceStep1 {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name="ConnectDeviceStep2"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
          >
            {(props) =>
              fontsLoaded ? (
                <ConnectDeviceStep2 {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name="SetupDevice"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
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
            name="ChargerSettings"
            options={{
              title: "astreea",
              headerStyle: {
                backgroundColor: "#F2F6F7",
              },

              headerShadowVisible: false,
              headerTintColor: "#393B3B",
            }}
          >
            {(props) =>
              fontsLoaded ? (
                <ChargerSettings {...props} extraData={"bla"} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
