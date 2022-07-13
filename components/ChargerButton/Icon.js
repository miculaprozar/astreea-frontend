import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const Icon = ({ isSecondary, isDanger, isShare }) => {
  const iconToRender = isSecondary
    ? "calendar-day"
    : isDanger
    ? "minus-circle"
    : isShare
    ? "share-alt"
    : "gas-pump";

  return <FontAwesome5 name={iconToRender} size={21} color="#393B3B" />;
};

export default Icon;
