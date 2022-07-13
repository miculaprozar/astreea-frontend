import React from "react";
import { Text, Pressable } from "react-native";
import { style } from "./HeaderNavigator.style";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountSettings = ({ navigation }) => (
  <Pressable onPress={() => navigation.navigate("Account")}>
    <MaterialCommunityIcons
      name="account-cog"
      size={24}
      color="#393B3B"
      style={{ marginLeft: "auto" }}
    />
  </Pressable>
);

export default AccountSettings;
