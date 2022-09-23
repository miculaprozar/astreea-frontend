export const getBGColorByStatus = (statusId) => {
  switch (statusId) {
    case "Charging":
      return "#FFFFFF";
    case "OutOfOrder":
      return "#FFFFFF";
    case "Occupied":
      return "#AEAEAE";
    case "Available":
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
    case "OutOfOrder":
      return "#FF6400";
    case "Occupied": //4
      return "#54565A";
    case "Available":
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
    case "OutOfOrder":
      return ["#FF6400"];
    case "Occupied":
      return ["#54565A"];
    case "Available":
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
    case "OutOfOrder":
      return ["#FF6400"];
    case "Occupied":
      return ["#54565A"];
    case "Available":
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
    case "OutOfOrder":
      return require("../../assets/orangeLighting.png");
    case "Occupied":
      return require("../../assets/greyLighting.png");
    case "Available":
      return require("../../assets/greyLighting.png");
    default:
      return require("../../assets/greenLighting.png");
  }
};
