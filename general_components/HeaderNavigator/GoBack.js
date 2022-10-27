import React, { useEffect, useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Text, Pressable, Image, View } from "react-native";
import { style } from "./HeaderNavigator.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HubConnectionState } from "@microsoft/signalr";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";

const GoBack = ({ navigation, navProps, route }) => {
  const { connectionStatus } = useContext(AuthContext);
  const [numberOfChargers, setNumberOfChargers] = useState(null);

  const getChargerListLength = async () => {
    if (connection.state == HubConnectionState.Connected) {
      //connection started
      await connection
        .invoke("GetConnectedCharges", false, null)
        .then((chargerList) => {
          setNumberOfChargers(chargerList.length);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const connection = global.connection;
      connectionStatus && getChargerListLength(connection);
    }, [connectionStatus])
  );

  return (
    <>
      {numberOfChargers && (
        <Pressable
          style={style.backAndArrowContainer}
          onPress={() => {
            console.log("PRESEDDDDDDDDDDDDDDDDDDDDD", navigation.canGoBack());
            if (navProps && navProps.onBack) {
              navProps.onBack();
            }
            if (route && route.name === "Home") {
              return;
            } else {
              // navigation.goBack();
              navigation.pop();
            }
          }}
        >
          {route &&
            route.name !== "SignIn" &&
            route.name !== "Home" &&
            !(route.name === "DeviceDetails" && numberOfChargers === 1) && (
              <>
                <Image
                  style={style.backImage}
                  source={require("../../assets/backWhite.png")}
                />
                <Text style={style.backButton}>Back</Text>
              </>
            )}

          {route && route.name === "SignIn" && (
            <View>
              <Text style={style.leftText}>Build for a lifetime.</Text>
            </View>
          )}
          {route && route.name === "Home" && (
            <Image
              style={style.chargerImage}
              source={require("../../assets/charger.png")}
            />
          )}
        </Pressable>
      )}
    </>
  );
};

export default GoBack;
