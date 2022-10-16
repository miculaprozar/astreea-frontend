import { invert } from "lodash";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  input: {
    width: "100%",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#888888",
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 70,
    marginBottom: 18
  },
  image: {
    width: 18,
    height: 18,
    position: "absolute",
    right: 15,
    transform: [{ translateY:  25}],
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
