import { StyleSheet } from "react-native";

export const input = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: "#393B3B",
    backgroundColor: "#393B3B",
    borderColor: "#393B3B",
    fontSize: 12,
    color: "#959595",
    fontFamily: "Inter_400Regular",
  },
});

export const inputFocused = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#393B3B",
    fontSize: 12,
    color: "#C1C1C1",
    fontFamily: "Inter_400Regular",
  },
});

export const inputDisabled = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#232323",
    fontSize: 12,
    color: "#959595",
    fontFamily: "Inter_400Regular",
  },
});

export const textStyle = StyleSheet.create({
  text: {
    color: "#393B3B",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    marginBottom: 7,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 5,
    marginTop: 5,
  },
});
