import { StyleSheet } from "react-native";

export const charging = StyleSheet.create({
  wrapper: {
    height: 125,
    backgroundColor: "rgba(255,255,255,0.30)",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
  },

  lastUsedWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
  locationText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
  smallText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    marginBottom: 3,
  },
  chargingStatusText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
  bottomWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chargingValuesText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: "Inter_500Medium",
  },

  circle: {
    backgroundColor: "#44CD54",
    // borderRadius: "50%",
    borderRadius: 50,
    width: 10,
    height: 10,
    marginTop: 2,
  },
});
