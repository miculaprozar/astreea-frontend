import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TextInput } from "react-native";
import { AuthProvider } from "./components/AuthWrapper/AuthProvider";
import { RouteGuard } from "./components/AuthWrapper/RouteGuarding";
import routes from "./routes";
import Account from "./Views/Account/Account";
import ChargerSettings from "./Views/ChargerSettings/ChargerSettings";
import ConnectDevice from "./Views/ConnectDevice/ConnectDevice";
import DeviceDetails from "./Views/DeviceDetails/DeviceDetails";
import Schedule from "./Views/Schedule/Schedule";
import ScheduleV2 from "./Views/ScheduleV2/ScheduleV2";
import Home from "./Views/Home/Home";
import TermsAndConditions from "./Views/TermsAndConditions/TermsAndConditions";

import StartPairing from "./Views/StartPairing/StartPairing";

import Permision from "./Views/Permision/Permision";
import QRScannerStep from "./Views/QRScannerStep/QRScannerStep";
import SetupDevice from "./Views/SetupDevice/SetupDevice";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_600SemiBold,
  });

  return (
      <NavigationContainer>
        <AuthProvider>
        <Stack.Navigator initialRouteName="TermsAndConditions">
          <Stack.Screen
            name={routes.Home.name}
            options={routes.Home.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <RouteGuard>
                  <Home {...props} />
                </RouteGuard>
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.TermsAndConditions.name}
            options={routes.TermsAndConditions.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <RouteGuard>
                  <TermsAndConditions {...props} />
                </RouteGuard>
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
                <RouteGuard>
                  <Account {...props} />
                </RouteGuard>
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>

          <Stack.Screen
            name={routes.QRScannerStep.name}
            options={routes.QRScannerStep.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <RouteGuard>
                  <QRScannerStep {...props} />
                </RouteGuard>
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
                <ConnectDevice {...props} />
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
              fontsLoaded ? <SetupDevice {...props} /> : <Text>Loading...</Text>
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.DeviceDetails.name}
            options={routes.DeviceDetails.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <DeviceDetails {...props} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.Schedule.name}
            options={routes.Schedule.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? <Schedule {...props} /> : <Text>Loading...</Text>
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.ScheduleV2.name}
            options={routes.ScheduleV2.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? <ScheduleV2 {...props} /> : <Text>Loading...</Text>
            }
          </Stack.Screen>
          <Stack.Screen
            name={routes.ChargerSettings.name}
            options={routes.ChargerSettings.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <ChargerSettings {...props} />
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
          <Stack.Screen
            name={routes.StartPairing.name}
            options={routes.StartPairing.navigationOptions}
          >
            {(props) =>
              fontsLoaded ? (
                <StartPairing {...props} />
              ) : (
                <Text>Loading...</Text>
              )
            }
          </Stack.Screen>
        </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    
  );
}
