import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Accordion, Block } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

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
        <Stack.Navigator initialRouteName="Home">
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
