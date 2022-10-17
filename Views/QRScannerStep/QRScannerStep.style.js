import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "Inter_600SemiBold",
    margin: 30,

    textAlign: "center",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
  },
  titleWhite: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  leftTextFooter: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
});
