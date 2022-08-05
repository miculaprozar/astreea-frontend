import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  betweenLinesText: {
    color: "#7F7F7F",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  forgotPasswordText: {
    color: "#636569",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    marginBottom: 15,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  line: {
    flex: 8,
    borderBottomWidth: 1,
    borderColor: "#7F7F7F",
    marginBottom: 6,
  },
  lineAndTextWrapper: {
    flexDirection: "row",
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
