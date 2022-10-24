import { StyleSheet } from "react-native";

export const card = StyleSheet.create({
  wrapper: {
    height: 210,
    backgroundColor: "rgba(255,255,255,0.30)",
    borderRadius: 15,
    padding: 18,
    marginBottom: 5,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#393B3B",
    backgroundColor: "#393B3B",
    borderColor: "#393B3B",
    fontSize: 10,
    color: "#959595",
    fontFamily: "Inter_400Regular",
  },
  label: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    marginBottom: 5,
  },
  buttonWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    fontSize: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 5,
    marginTop: 5,
  },
  swittchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  switchText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
});
