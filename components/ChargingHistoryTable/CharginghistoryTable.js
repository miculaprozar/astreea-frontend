import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import { style } from "./ChargingHistoryTable.style";
let deleteIcon = require('../../assets/delete.png');
const ChargingHistoryTable = () => {
  return (
    <View>
      <Text style={style.title}>History</Text>
      <View style={style.scheduleTableCard}>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderColor: "#FFFFFF",
              height: 25
            }}
          >
            <Text style={style.headerText}>Start</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#FFFFFF",
                width: "100%",
              }}
            ></View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderColor: "#FFFFFF",
            }}
          >
            <Text style={style.headerText}>Stop</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#FFFFFF",
                width: "100%",
              }}
            ></View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderColor: "#FFFFFF",
            }}
          >
            <Text style={style.headerText}>Kwh</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#FFFFFF",
                width: "100%",
              }}
            ></View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              borderRightWidth: 1,
              borderColor: "#FFFFFF",
            }}
          >
            <Text style={style.headerText}>Charging Time</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#FFFFFF",
                width: "100%",
              }}
            ></View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={style.headerText}>Delete</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#FFFFFF",
                width: "100%",
              }}
            ></View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={style.lefDoubleWrapper}>
              <Text style={style.tableTextData}>11</Text>
            </View>
            <View style={style.rightDoubleWrapper}>
              <Text style={style.tableTextData}>11</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={style.lefDoubleWrapper}>
              <Text style={style.tableTextData}>22</Text>
            </View>
            <View style={style.rightDoubleWrapper}>
              <Text style={style.tableTextData}>22</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={style.entireWrapper}>
              <Text style={style.tableTextData}>33</Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{ ...style.lefDoubleWrapper, backgroundColor: "#484848" }}
            >
              <Text style={style.tableTextData}>22</Text>
            </View>
            <View
              style={{
                ...style.rightDoubleWrapper,
                backgroundColor: "#484848",
              }}
            >
              <Text style={style.tableTextData}>22</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <View style={{}}>
              <Image source={require("../../assets/delete.png")}
              style={{ width: 18, height: 18, resizeMode: "contain", marginTop: 2 }}></Image>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChargingHistoryTable;
