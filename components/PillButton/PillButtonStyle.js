import { StyleSheet } from "react-native";

export const primary = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 37,
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "#FF6400",
    shadowColor: "#FF6400",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "#393B3B",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});

export const secondary = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 37,
    backgroundColor: "#97A6AD",
    borderColor: "#97A6AD",
    shadowColor: "#97A6AD",
    borderWidth: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
