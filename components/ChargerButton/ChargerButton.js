import React from "react";
import { Pressable, Text, View } from "react-native";
import { secondary, primary, danger, share } from "./ChargerButtonStyle";

import Icon from "./Icon";

const ChargerButton = ({
  isSecondary,
  isDanger,
  isShare,
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
}) => {
  let buttonType = isSecondary
    ? secondary
    : isDanger
    ? danger
    : isShare
    ? share
    : primary;

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
        <View style={{ flexDirection: "row" }}>
          <Icon
            isSecondary={isSecondary}
            isDanger={isDanger}
            isShare={isShare}
          />
          <Text style={buttonType.text}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ChargerButton;
