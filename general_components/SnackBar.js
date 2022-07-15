import React from "react";
import { Pressable, Text, View } from "react-native";
import { style } from "./SnackBar.style";

const SnackBar = ({ text }) => {
  return (
    <View style={style.wrapper}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default SnackBar;
