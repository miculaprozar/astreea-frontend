import React from "react";
import { style } from "./HeaderBackButtonStyle";

import { Text, View, Platform } from "react-native";

const HeaderBackButton = ({ onPress }) => {
  return (
    <Text style={{ ...style.text, backgroundColor: "red" }} onPress={onPress}>
      Back
    </Text>
  );
};

export default HeaderBackButton;
