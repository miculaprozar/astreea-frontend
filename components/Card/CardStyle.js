import { StyleSheet } from "react-native";

export const charging = StyleSheet.create({
  wrapper: {
    height: 140,
    backgroundColor: "#4F6363",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  upperTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
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
    color: "#828282",
    fontFamily: "Inter_400Regular",
    marginBottom: 3,
  },
  chargingStatusText: {
    fontSize: 14,
    color: "#22EEAB",
    fontFamily: "Inter_400Regular",
  },
  chargingValuesText: {
    fontSize: 16,
    color: "#22EEAB",
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
});
