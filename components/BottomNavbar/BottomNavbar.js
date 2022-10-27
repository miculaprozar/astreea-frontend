import React, { useEffect, useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { HubConnectionState } from "@microsoft/signalr";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";

import { style } from "./BottomNavbar.style";

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

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
      {route.name !== "TermsAndConditions" ? (
        <View style={style.container}>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("QRScannerStep");
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              style={style.addChargerimage}
              source={require("../../assets/addCharger.png")}
            />
            <Text style={style.textImage}>Add Charger</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate(
                numberOfChargers > 1 ? "Home" : "DeviceDetails"
              );
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              style={style.images}
              source={require("../../assets/Home.png")}
            />
            <Text style={style.textImage}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              );
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              style={style.images}
              source={require("../../assets/location.png")}
            />
            <Text style={style.textImage}>Find Charger</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              );
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              style={style.images}
              source={require("../../assets/help.png")}
            />
            <Text style={style.textImage}>Help</Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
};

export default BottomNavbar;
