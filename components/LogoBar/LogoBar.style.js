import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
  },
  image: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  leftText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
});
