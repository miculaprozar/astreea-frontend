import { StyleSheet } from "react-native";

export const charging = StyleSheet.create({
  wrapper: {
    height: 130,
    backgroundColor: "#4F6363",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  upperTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
  },
  smallText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
  chargingStatusText: {
    fontSize: 16,
    color: "#22EEAB",
    fontFamily: "Inter_600SemiBold",
  },
  chargingValuesText: {
    fontSize: 16,
    color: "#22EEAB",
    fontFamily: "Inter_500Medium",
  },
});
