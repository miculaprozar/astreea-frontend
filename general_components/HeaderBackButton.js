import React from "react";
import { style } from "./HeaderBackButtonStyle";

import { Text, View, Platform } from "react-native";

const HeaderBackButton = ({ onPress }) => {
  return (
    <Text style={style.text} onPress={onPress}>
      Back
    </Text>
  );
};

export default HeaderBackButton;
