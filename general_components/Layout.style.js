import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  device_container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E0E0E",
  },
  layout_container: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 0,
    maxHeight: "100%",
    width: "100%",
  },
  body: {
    flex: 1,
    paddingBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  header: {
    paddingBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    
  },
  footer: {
    paddingBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
});
