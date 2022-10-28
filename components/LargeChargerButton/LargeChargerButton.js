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
  icon = null,
  isSave = false,
  isDisabled = false,
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
      {isSave ? (
        <Pressable
          style={{
            ...button.container,
            backgroundColor: "black",
            borderColor: "black",
          }}
          onPress={onPressAction}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...button.text,
              }}
            >
              {"SAVE"}
            </Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={{
            ...button.container,
            ...(!isCharging &&
              !icon && {
                backgroundColor: "#44CD54",
                borderColor: "#44CD54",
              }),
            ...(isCharging &&
              !icon && {
                backgroundColor: "#FFFFFF",
                borderColor: "#FFFFFF",
              }),
            ...(isDisabled && {
              backgroundColor: "#696969",
              borderColor: "#696969",
            }),
          }}
          onPress={onPressAction}
        >
          <View style={{ flexDirection: "row" }}>
            {icon ? (
              <Image
                source={icon}
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
      )}
    </View>
  );
};

export default LargeChargerButton;
