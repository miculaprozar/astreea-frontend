import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#393B3B",
    marginBottom: 15,
  },
  image: {
    width: 20,
    height: 20,
    position: "absolute",
    top: "50%",
    right: 15,
    transform: [{ translateY: -17 }],
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
