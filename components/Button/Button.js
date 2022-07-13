import React from "react";
import { Pressable, Text, View } from "react-native";
import { secondary, primary } from "./ButtonStyle";

const Button = ({
  isSecondary,
  text,
  marginTop,
  marginBottom,
  onPressAction,
}) => {
  let buttonType = isSecondary ? secondary : primary;

  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <Pressable style={buttonType.container} onPress={onPressAction}>
        <Text style={buttonType.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
