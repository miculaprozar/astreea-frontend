import React from "react";
import { Pressable, View, Text, Image } from "react-native";
import { button } from "./ColorButtons.style";

const ColorButtons = ({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
  text,
  backgroundColor,
}) => {
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    >
      <Pressable
        style={{
          ...button.container,
          ...(backgroundColor && { backgroundColor: backgroundColor }),
        }}
        onPress={onPressAction}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              ...button.text,
            }}
          >
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ColorButtons;
