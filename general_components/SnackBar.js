import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { style } from "./SnackBar.style";
import { useNavigation } from "@react-navigation/native";

const SnackBar = ({
  text,
  logSnackbar,
  setLogSnackbar,
  logType,
  customStyle,
  setHasRedirect,
  hasRedirect = false,
}) => {
  const bkColor =
    logType === "error"
      ? "#ff6400"
      : logType === "info"
      ? "#97a6ad"
      : "#393b3b";
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLogSnackbar(false);
      setHasRedirect(false);
    }, 5000);
  }, [logSnackbar]);

  return (
    <View
      style={{ ...style.wrapper, ...customStyle, backgroundColor: bkColor }}
    >
      <Text style={{ ...style.text, elevation: 999 }}>{text}</Text>
      {hasRedirect && (
        <Pressable onPress={() => navigation.navigate("Help")}>
          <Text style={style.redirectText}>here</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SnackBar;
