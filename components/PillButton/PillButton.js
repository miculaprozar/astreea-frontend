import React from "react";
import { Pressable, Text, View } from "react-native";
import { secondary, primary } from "./PillButtonStyle";

const PillButton = ({
  isSecondary,
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
}) => {
  let buttonType = isSecondary ? secondary : primary;
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    >
      <Pressable style={buttonType.container} onPress={onPressAction}>
        <Text style={buttonType.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default PillButton;
