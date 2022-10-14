import React from "react";
import { Pressable, View } from "react-native";
import { button } from "./ChargerButtonStyle";

import Icon from "./Icon";

const ChargerButton = ({
  isSecondary,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
  isCharging,
  isDisabled,
  isSchedule,
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
          ...(isCharging
            ? { backgroundColor: "#FFFFFF", borderColor: "#FFFFFF" }
            : !(isSchedule || isSecondary) && {
                backgroundColor: "#44CD54",
                borderColor: "#44CD54",
              }),
          ...((isSchedule || isSecondary) &&
            isCharging && {
              borderColor: "#FFFFFF",
              backgroundColor: "#44CD54",
            }),
          ...(isDisabled && {
            backgroundColor: "#696969",
            borderColor: "#696969",
          }),
        }}
        onPress={onPressAction}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon
            isSecondary={isSecondary}
            isSchedule={isSchedule}
            isCharging={isCharging}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ChargerButton;
