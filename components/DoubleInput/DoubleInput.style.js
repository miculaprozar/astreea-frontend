import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderWidth: 1,
    backgroundColor: "#232323",
    fontSize: 10,
    color: "#959595",
    fontFamily: "Inter_400Regular",
    width: 70,
  },
  leftInput: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightColor: "rgba(255, 255, 255, 0.9)",
  },
  rightInput: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftColor: "rgba(255, 255, 255, 0.9)",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 5,
  },
});
