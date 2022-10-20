import { StyleSheet } from "react-native";

export const charging = StyleSheet.create({
  wrapper: {
    height: 237,
    backgroundColor: "#4F6363",
    borderRadius: 15,
    padding: 18,
    paddingTop: 24,
    marginBottom: 18,
  },
  upperTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    paddingBottom: 18,
  },
  lastUsedWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 21,
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
    fontSize: 20,
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
    marginLeft: 10,
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
