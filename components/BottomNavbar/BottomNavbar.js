import React, { useEffect, useState, useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { style } from "./BottomNavbar.style";

const BottomNavbar = () => {
  return (
    <View style={style.wrapper}>
      <View style={style.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={style.addChargerimage}
            source={require("../../assets/addCharger.png")}
          />
          <Text style={style.textImage}>Add Charger</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={style.images}
            source={require("../../assets/Home.png")}
          />
          <Text style={style.textImage}>Home</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={style.images}
            source={require("../../assets/connectedDevices.png")}
          />
          <Text style={style.textImage}>Connected Devices</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={style.images}
            source={require("../../assets/help.png")}
          />
          <Text style={style.textImage}>Help</Text>
        </View>
      </View>
    </View>
  );
};

export default BottomNavbar;
