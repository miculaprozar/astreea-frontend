import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  wrapper: {
    height: 140,
    backgroundColor: "#4F6363",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.30)",
    borderWidth: 1,
    borderColor: "white",
    color: "white",
  },
  upperTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ffffff",
    paddingBottom: 10,
  },
  lastUsedWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
  smallText: {
    fontSize: 10,
    color: "white",
    fontFamily: "Inter_400Regular",
    marginBottom: 3,
  },
  chargingStatusText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Inter_400Regular",
  },
  chargingValuesText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Inter_500Medium",
  },
  image: {
    width: 14,
    height: 14,
    resizeMode: "contain",
    marginTop: 2,
    marginRight: 4,
  },
  circle: {
    backgroundColor: "#44CD54",
    // borderRadius: "50%",
    borderRadius: 50,
    width: 10,
    height: 10,
    marginTop: 2,
  },
  pairButtonWrapper: {
    backgroundColor: "#FF6400",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    borderRadius: 30,
    marginLeft: "auto",
    marginTop: 30,
  },
  pairButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
  },
});
