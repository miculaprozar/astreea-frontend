import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import { style } from "./ChargingHistoryTable.style";
let deleteIcon = require('../../assets/delete.png');
const ChargingHistoryTable = (props) => {
  const {chargerProfiles} = props;

  const getStart = (date, startPeriod, type) => {
    let newDate = new Date(date);
    newDate.setSeconds(newDate.getSeconds() + startPeriod);
    let hours = new Date(newDate).getUTCHours();
    let minutes = new Date(newDate).getUTCMinutes();
    return type === "hours" ? hours : minutes;
  }

  const getStop = (date, duration, startPeriod, type) => {
    let newDate = new Date(date);
    newDate.setSeconds(newDate.getSeconds() + duration+startPeriod);
    let hours = new Date(newDate).getUTCHours();
    let minutes = new Date(newDate).getUTCMinutes();
    return type === "hours" ? hours : minutes;
  }

  const getChargingTime = (date, duration, startPeriod, type) => {
    let startDate = new Date(date);
    let endDate = startDate.setSeconds(startDate.getSeconds() + duration+startPeriod);
    var diffMs = (startDate - endDate);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return type === "hours" ? diffHrs : diffMins;
  }

  return (
    <View>
      {
        chargerProfiles ? <Text style={style.title}>History</Text> : null
      }
      {
        chargerProfiles ? <View style={style.scheduleTableCard}>
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
        <>{ 
          chargerProfiles.map((profile,index) => <View key={"profile_"+index} style={{ flexDirection: "row", marginBottom: 5 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={style.lefDoubleWrapper}>
              <Text style={style.tableTextData}>{getStart(profile.chargingSchedule.startSchedule, profile.chargingSchedule.chargingSchedulePeriod[0].startPeriod, "hours")}</Text>
            </View>
            <View style={style.rightDoubleWrapper}>
              <Text style={style.tableTextData}>{getStart(profile.chargingSchedule.startSchedule, profile.chargingSchedule.chargingSchedulePeriod[0].startPeriod, "minutes")}</Text>
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
              <Text style={style.tableTextData}>{getStop(profile.chargingSchedule.startSchedule, profile.chargingSchedule.duration, profile.chargingSchedule.chargingSchedulePeriod[0].startPeriod, "hours")}</Text>
            </View>
            <View style={style.rightDoubleWrapper}>
              <Text style={style.tableTextData}>{getStop(profile.chargingSchedule.startSchedule, profile.chargingSchedule.duration, profile.chargingSchedule.chargingSchedulePeriod[0].startPeriod, "minutes")}</Text>
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
              <Text style={style.tableTextData}>{profile.chargingSchedule.chargingSchedulePeriod[0].limit}</Text>
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
              <Text style={style.tableTextData}>{getChargingTime(profile.chargingSchedule.startSchedule, profile.chargingSchedule.duration, profile.chargingSchedule.chargingSchedulePeriod[0].startPeriod, "hours")}</Text>
            </View>
            <View
              style={{
                ...style.rightDoubleWrapper,
                backgroundColor: "#484848",
              }}
            >
              <Text style={style.tableTextData}>{getChargingTime(profile.chargingSchedule.startSchedule, profile.chargingSchedule.duration, profile.chargingSchedule.chargingSchedulePeriod[0].startPeriod, "minutes")}</Text>
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
        </View>)
        }</>
      </View> : null
      }
      
    </View>
  );
};

export default ChargingHistoryTable;
