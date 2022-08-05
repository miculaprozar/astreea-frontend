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
    borderWidth: 1,
    borderColor: "#393B3B",
    fontSize: 12,
    color: "#959595",
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
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#232323",
    fontSize: 12,
    color: "#959595",
    shadowColor: "#000000",
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
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 5,
    marginTop: 5,
  },
});
