import { StyleSheet } from "react-native";

export const primary = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: 90,
    borderRadius: 5,
    backgroundColor: "#FF6400",
    shadowColor: "#FF6400",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Inter_500Medium",
  },
});

export const secondary = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: 90,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "#393B3B",
    fontSize: 10,
    fontFamily: "Inter_500Medium",
  },
});

export const danger = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 6,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "red",
    shadowColor: "red",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Inter_500Medium",
  },
});
