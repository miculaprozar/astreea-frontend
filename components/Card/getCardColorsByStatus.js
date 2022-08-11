export const getBGColorByStatus = (statusId) => {
  switch (statusId) {
    case 3:
      return "#FFFFFF";
    case 5:
      return "#FFFFFF";
    case 4:
      return "#AEAEAE";
    case 1:
      return "#FFFFFF";
    default:
      return "#FFFFFF";
  }
};

export const getTextColorByStatus = (statusId) => {
  switch (statusId) {
    case 3:
      return "#44CD54";
    case 5:
      return "#FF6400";
    case 4:
      return "#54565A";
    case 1:
      return "#B1AAA0";
    default:
      return "#B1AAA0";
  }
};

const getHeaderTextByStatus = (statusId) => {
  switch (statusId) {
    case 3:
      return ["#44CD54"];
    case 5:
      return ["#FF6400"];
    case 4:
      return ["#54565A"];
    case 1:
      return ["#B1AAA0"];
    default:
      return ["#B1AAA0", "#44CD54"];
  }
};

export const headerTextColor = (charger) =>
  getHeaderTextByStatus(charger.appState).length === 1
    ? getHeaderTextByStatus(charger.appState)[0]
    : getHeaderTextByStatus(charger.appState)[1];

const getCircleColorByStatus = (statusId) => {
  switch (statusId) {
    case 3:
      return ["#44CD54"];
    case 5:
      return ["#FF6400"];
    case 4:
      return ["#54565A"];
    case 1:
      return ["#54565A"];
    default:
      return ["#54565A", "#44CD54"];
  }
};

export const circleColor = (charger, number) =>
  getCircleColorByStatus(charger.appState).length === 1
    ? getCircleColorByStatus(charger.appState)[0]
    : getCircleColorByStatus(charger.appState)[number];

export const getLightingImageByStatus = (statusName) => {
  switch (statusName) {
    case 3:
      return require("../../assets/greenLighting.png");
    case 5:
      return require("../../assets/orangeLighting.png");
    case 4:
      return require("../../assets/greyLighting.png");
    case 1:
      return require("../../assets/greyLighting.png");
    default:
      return require("../../assets/greenLighting.png");
  }
};
