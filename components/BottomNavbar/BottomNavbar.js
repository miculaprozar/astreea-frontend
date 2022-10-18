import React, { useEffect, useState, useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

import { style } from "./BottomNavbar.style";

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      {route.name !== "TermsAndConditions" ? (
        <View style={style.wrapper}>
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
                navigation.navigate("Home");
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
        </View>
      ) : null}
    </>
  );
};

export default BottomNavbar;
