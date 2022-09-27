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
          ...(!isSecondary &&
            !isSchedule && { backgroundColor: "rgba(0,186,255,0.11)" }),
          ...(isCharging && { backgroundColor: "rgba(238,0,5,0.30)" }),
          ...(isDisabled && { backgroundColor: "rgba(200,200,200, 0.2)" }),
        }}
        onPress={onPressAction}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon isSecondary={isSecondary} isSchedule={isSchedule} />
        </View>
      </Pressable>
    </View>
  );
};

export default ChargerButton;
