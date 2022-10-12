import React from "react";
import { Text, Image } from "react-native";

const Icon = ({ isSecondary, isSchedule, isCharging }) => {
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
        return isCharging
          ? require("../../assets/settingWhite.png")
          : require("../../assets/settingGrey.png");
    }
  };
  return (
    <>
      {isSecondary || isSchedule ? (
        <Image
          source={getLightingImageByStatus(iconToRender)}
          style={{ width: 12, height: 12, resizeMode: "contain" }}
        />
      ) : (
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Inter_600SemiBold",
            ...(!isCharging ? { color: "#FFFFFF" } : { color: "#44CD54" }),
          }}
        >
          {isCharging ? "STOP" : "START"}
        </Text>
      )}
    </>
  );
};

export default Icon;
