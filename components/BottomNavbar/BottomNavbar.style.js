import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0E0E0E",
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
  container: {
    width: "100%",
    maxWidth: 375,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addChargerimage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginBottom: 5,
  },
  images: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginTop: 8,
    marginBottom: 11,
  },
  textImage: {
    fontSize: 8,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
});
