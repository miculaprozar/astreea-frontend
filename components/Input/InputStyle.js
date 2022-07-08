import { StyleSheet } from "react-native";

export const input = StyleSheet.create({
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 37,
    backgroundColor: "#F2F6F7",
    borderWidth: 1,
    borderColor: "#393B3B",
    fontSize: 14,
    color: "#393B3B",
  },
});

export const inputFocused = StyleSheet.create({
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 37,
    backgroundColor: "#F2F6F7",
    borderWidth: 1,
    borderColor: "#FF6400",
    fontSize: 14,
    color: "#393B3B",
    shadowColor: "#FF6400",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export const inputDisabled = StyleSheet.create({
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 37,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    backgroundColor: "#97A6AD",
    borderWidth: 0,
    color: "#FFFFFF",
  },
});

export const textStyle = StyleSheet.create({
  text: {
    color: "#393B3B",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    marginBottom: 7,
  },
});
