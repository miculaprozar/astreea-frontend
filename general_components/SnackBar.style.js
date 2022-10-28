import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "red",
    bottom: 10,
    zIndex: 999,
    elevation: 999,
    flexDirection: "row",
  },
  text: {
    color: "#FFFFFF",
  },
  redirectText: {
    marginLeft: 5,
    color: "red",
    fontFamily: "Inter_400Regular",
    textDecorationLine: "underline",
  },
});
