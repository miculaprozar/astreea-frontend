import { StyleSheet } from "react-native";

export const primary = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 37,
    backgroundColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  dontFill: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  width100: {
    width: "100%",
  },
});

export const danger = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 37,
    backgroundColor: "red",
    shadowColor: "red",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  dontFill: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  width100: {
    width: "100%",
  },
});

export const secondary = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 37,
    backgroundColor: "#232323",
    shadowColor: "#232323",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  dontFill: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  width100: {
    width: "100%",
  },
});
