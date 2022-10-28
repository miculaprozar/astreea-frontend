import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, TextInput, StatusBar } from "react-native";
import { AuthProvider } from "./components/AuthWrapper/AuthProvider";
import { RouteGuard } from "./components/AuthWrapper/RouteGuarding";
import routes from "./routes";
import Account from "./Views/Account/Account";
import ChargerSettings from "./Views/ChargerSettings/ChargerSettings";
import ChargingHistory from "./Views/ChargingHistory/ChargingHistory";

import ConnectDevice from "./Views/ConnectDevice/ConnectDevice";
import DeviceDetails from "./Views/DeviceDetails/DeviceDetails";
import Schedule from "./Views/Schedule/Schedule";
import ScheduleV2 from "./Views/ScheduleV2/ScheduleV2";
import Home from "./Views/Home/Home";
import TermsAndConditions from "./Views/TermsAndConditions/TermsAndConditions";
import Help from "./Views/Help/Help";

import StartPairing from "./Views/StartPairing/StartPairing";

import Permision from "./Views/Permision/Permision";
import QRScannerStep from "./Views/QRScannerStep/QRScannerStep";
import SetupDevice from "./Views/SetupDevice/SetupDevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HubConnectionState } from "@microsoft/signalr";
import { createNavigationContainerRef } from "@react-navigation/native";

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();
export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [chargerSerialNumberCon, setChargerSerialNumberCon] = useState(null);
  const [numberOfChargers, setNumberOfChargers] = useState(null);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_600SemiBold,
  });

  const identifyInitialRoute = async () => {
    try {
      const termsAndCond = await AsyncStorage.getItem("termsAndCond");

      if (termsAndCond === "accepted" && numberOfChargers > 1) {
        setInitialRoute("Home");
        navigationRef.navigate("Home");
      } else if (termsAndCond === "accepted" && numberOfChargers === 1) {
        console.log("WE ARE HERE");
        setInitialRoute("DeviceDetails");
        navigationRef.navigate("DeviceDetails", {
          serialNumberCon: chargerSerialNumberCon,
        });
      } else if (termsAndCond === "accepted" && numberOfChargers === 0) {
        setInitialRoute("QRScannerStep");
      } else {
        setInitialRoute("TermsAndConditions");
      }
    } catch (e) {
      console.log("Error getting firstName, lastName:", e);
      // error reading value
    }
  };

  const numberOfChargersChanged = async () => {
    const connection = global.connection;

    if (connection.state == HubConnectionState.Connected) {
      //connection started
      await connection
        .invoke("GetConnectedCharges", false, null)
        .then((chargerList) => {
          if (chargerList.length > 0) {
            setChargerSerialNumberCon(chargerList[0].serialNumberCon);
          }
          setNumberOfChargers(chargerList.length);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  useEffect(() => {
    console.log("THE NUMBER OF CHARGERS:", numberOfChargers);
    numberOfChargers !== null && identifyInitialRoute();
  }, [numberOfChargers]);

  useEffect(() => {
    console.log("THE INITIAL ROUTE IS", initialRoute);
  }, [initialRoute]);

  return (
    <>
      <StatusBar
        animated={false}
        backgroundColor="#737678"
        translucent={true}
      />
      <AuthProvider
        setNumberOfChargers={setNumberOfChargers}
        setChargerSerialNumberCon={setChargerSerialNumberCon}
        numberOfChargersChanged={numberOfChargersChanged}
      >
        {numberOfChargers !== null && initialRoute !== null && (
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialRoute}>
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
                      <QRScannerStep
                        {...props}
                        setInitialRoute={setInitialRoute}
                        numberOfChargers={numberOfChargers}
                        setNumberOfChargers={setNumberOfChargers}
                        chargerSerialNumberCon={chargerSerialNumberCon}
                        numberOfChargersChanged={numberOfChargersChanged}
                      />
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
                  fontsLoaded ? (
                    <SetupDevice {...props} />
                  ) : (
                    <Text>Loading...</Text>
                  )
                }
              </Stack.Screen>
              <Stack.Screen
                name={routes.DeviceDetails.name}
                options={routes.DeviceDetails.navigationOptions}
                initialParams={{ serialNumberCon: chargerSerialNumberCon }}
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
                  fontsLoaded ? (
                    <Schedule {...props} />
                  ) : (
                    <Text>Loading...</Text>
                  )
                }
              </Stack.Screen>
              <Stack.Screen
                name={routes.Help.name}
                options={routes.Help.navigationOptions}
              >
                {(props) =>
                  fontsLoaded ? <Help {...props} /> : <Text>Loading...</Text>
                }
              </Stack.Screen>
              <Stack.Screen
                name={routes.ScheduleV2.name}
                options={routes.ScheduleV2.navigationOptions}
              >
                {(props) =>
                  fontsLoaded ? (
                    <ScheduleV2 {...props} />
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
                    <ChargerSettings {...props} />
                  ) : (
                    <Text>Loading...</Text>
                  )
                }
              </Stack.Screen>
              <Stack.Screen
                name={routes.ChargingHistory.name}
                options={routes.ChargingHistory.navigationOptions}
              >
                {(props) =>
                  fontsLoaded ? (
                    <ChargingHistory {...props} />
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
                  fontsLoaded ? (
                    <Permision {...props} />
                  ) : (
                    <Text>Loading...</Text>
                  )
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
          </NavigationContainer>
        )}
      </AuthProvider>
    </>
  );
}
