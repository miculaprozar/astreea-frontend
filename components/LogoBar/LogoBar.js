import React from "react";
import { Image, Text, View } from "react-native";
import { style } from "./LogoBar.style";

const LogoBar = () => (
  <View style={style.wrapper}>
    <View style={{ flex: 1 }}>
      <Text style={style.leftText}>Build for a lifetime.</Text>
    </View>

    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Image
        style={style.image}
        source={require("../../assets/titleWhite.png")}
      />
    </View>
  </View>
);

export default LogoBar;
