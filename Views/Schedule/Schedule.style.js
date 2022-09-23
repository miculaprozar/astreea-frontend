import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  title: {
    fontSize: 28,
    color: "white",
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputsCard: {
    minHeight: 150,
    height: "30%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 5,
  },
  scheduleTableCard: {
    height: "60%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
  },
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
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 5,
  },
});
