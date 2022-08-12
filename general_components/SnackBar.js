import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { style } from "./SnackBar.style";

const SnackBar = ({
  text,
  logSnackbar,
  setLogSnackbar,
  logType,
  customStyle,
}) => {
  const bkColor =
    logType === "error"
      ? "#ff6400"
      : logType === "info"
      ? "#97a6ad"
      : "#393b3b";

  useEffect(() => {
    setTimeout(() => {
      setLogSnackbar(false);
    }, 5000);
  }, [logSnackbar]);

  return (
    <View
      style={{ ...style.wrapper, ...customStyle, backgroundColor: bkColor }}
    >
      <Text style={{ ...style.text, elevation: 999 }}>{text}</Text>
    </View>
  );
};

export default SnackBar;
