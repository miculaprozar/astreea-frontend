import React from "react";
import { Pressable, Text, View } from "react-native";
import { secondary, primary, danger } from "./ChargerButtonStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const ChargerButton = ({
  isSecondary,
  isDanger,
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
}) => {
  let buttonType = isSecondary ? secondary : isDanger ? danger : primary;

  console.log("THE TEXT IS:", text);
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
          {/* <FontAwesome5 name="gas-pump" size={21} color="#393B3B" />
           */}

          {/* <FontAwesome5 name="calendar-day" size={21} color="#393B3B" /> */}
          <MaterialIcons name="remove-circle" size={21} color="#393B3B" />

          <Text style={buttonType.text}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ChargerButton;
