import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoimage: {
    width: 162,
    height: 42,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    resizeMode: "contain",
  },

  text: {
    fontSize: 10,
    color: "#636569",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 5,
  },
  privayText: {
    fontSize: 10,
    color: "#FF6400",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
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
