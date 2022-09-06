export const getBGColorByStatus = (statusId) => {
  switch (statusId) {
    case "Charging":
      return "#FFFFFF";
    case "Disconnected/Error":
      return "#FFFFFF";
    case "In use":
      return "#AEAEAE";
    case "Not Used":
      return "#FFFFFF";
    default:
      return "#FFFFFF";
  }
};

export const getTextColorByStatus = (statusId, isDetails) => {
  if (isDetails) return "#FFFFFF";
  switch (statusId) {
    case "Charging":
      return "#44CD54";
    case "Disconnected/Error":
      return "#FF6400";
    case "In use": //4
      return "#54565A";
    case "Not Used":
      return "#54565A";
    default:
      return "#54565A";
  }
};

const getHeaderTextByStatus = (statusId, isDetails) => {
  if (isDetails) return ["#FFFFFF", "#FFFFFF"];

  switch (statusId) {
    case "Charging":
      return ["#44CD54"];
    case "Disconnected/Error":
      return ["#FF6400"];
    case "In use":
      return ["#54565A"];
    case "Not Used":
      return ["#54565A"];
    default:
      return ["#B1AAA0", "#44CD54"];
  }
};

export const headerTextColor = (charger, isDetails) =>
  getHeaderTextByStatus(charger.state, isDetails).length === 1
    ? getHeaderTextByStatus(charger.state, isDetails)[0]
    : getHeaderTextByStatus(charger.state, isDetails)[1];

const getCircleColorByStatus = (statusId) => {
  switch (statusId) {
    case "Charging":
      return ["#44CD54"];
    case "Disconnected/Error":
      return ["#FF6400"];
    case "In use":
      return ["#54565A"];
    case "Not Used":
      return ["#54565A"];
    default:
      return ["#54565A", "#44CD54"];
  }
};

export const circleColor = (charger, number) =>
  getCircleColorByStatus(charger.state).length === 1
    ? getCircleColorByStatus(charger.state)[0]
    : getCircleColorByStatus(charger.state)[number];

export const getLightingImageByStatus = (statusName) => {
  switch (statusName) {
    case "Charging":
      return require("../../assets/greenLighting.png");
    case "Disconnected/Error":
      return require("../../assets/orangeLighting.png");
    case "In use":
      return require("../../assets/greyLighting.png");
    case "Not Used":
      return require("../../assets/greyLighting.png");
    default:
      return require("../../assets/greenLighting.png");
  }
};
