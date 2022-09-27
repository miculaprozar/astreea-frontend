import React from "react";
import { Image } from "react-native";

const Icon = ({ isSecondary, isSchedule }) => {
  const iconToRender = isSecondary
    ? "calendar-day"
    : isSchedule
    ? "Schedule"
    : "Power";
  const getLightingImageByStatus = (statusName) => {
    switch (statusName) {
      case "Power":
        return require("../../assets/powerWhite.png");
      case "Schedule":
        return require("../../assets/scheduleWhite.png");
      default:
        return require("../../assets/settingWhite.png");
    }
  };
  return (
    <Image
      source={getLightingImageByStatus(iconToRender)}
      style={{ width: 20, height: 20, resizeMode: "contain" }}
    />
  );
};

export default Icon;
