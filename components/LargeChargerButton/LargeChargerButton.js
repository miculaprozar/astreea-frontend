import React from "react";
import { Pressable, View, Text, Image } from "react-native";
import { button } from "./LargeChargerButton.style";

const LargeChargerButton = ({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
  isCharging,
  isSchedule = false,
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
          ...(!isCharging &&
            !isSchedule && {
              backgroundColor: "#44CD54",
              borderColor: "#44CD54",
            }),
          ...(isCharging &&
            !isSchedule && {
              backgroundColor: "#FFFFFF",
              borderColor: "#FFFFFF",
            }),
        }}
        onPress={onPressAction}
      >
        <View style={{ flexDirection: "row" }}>
          {isSchedule ? (
            <Image
              source={require("../../assets/scheduleWhite.png")}
              style={{ width: 17, height: 17, resizeMode: "contain" }}
            />
          ) : (
            <Text
              style={{
                ...button.text,
                ...(isCharging && { color: "#44CD54" }),
              }}
            >
              {!isCharging ? "START" : "STOP"}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default LargeChargerButton;
