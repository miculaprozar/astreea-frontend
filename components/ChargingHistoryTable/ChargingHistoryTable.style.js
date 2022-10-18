import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  title: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Inter_500Medium",
  },
  //   inputsCard: {
  //     height: 170,
  //     backgroundColor: "rgba(255, 255, 255, 0.9)",
  //     borderRadius: 10,
  //     padding: 5,
  //   },
  scheduleTableCard: {
    height: "60%",
    backgroundColor: "#898A8C",
    // backgroundColor: "#797979",
    borderRadius: 10,
    padding: 15,
  },
  lefDoubleWrapper: {
    backgroundColor: "#bebebe",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
    borderRightWidth: 0.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    padding: 5,
  },
  rightDoubleWrapper: {
    backgroundColor: "#bebebe",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flex: 1,
    borderColor: "#FFFFFF",
    borderLeftWidth: 0.5,
    alignItems: "center",
    padding: 5,
    marginRight: 3,
  },
  tableTextData: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
  },
  entireWrapper: {
    backgroundColor: "#bebebe",
    borderRadius: 5,
    flex: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    padding: 5,
    marginRight: 3,
  },
});
