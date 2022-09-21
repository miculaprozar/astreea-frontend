import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import moment from "moment";

import { chargeDate, chargeLastUsed } from "../../helpers/formatFunctions";
import { style } from "./TotalChargeCard.style";
import { getEndMonthDate } from "../../helpers/dateFormatFunctions";

import { HubConnectionState } from "@microsoft/signalr";

const TotalChargeCard = ({ charger, date = null }) => {
  const [chargingStats, setChargingStats] = useState(null);

  const connection = global.connection;

  const secondsInHoursAndMinutes = (seconds) => {
    const hoursAndMinutes = new Date(seconds * 1000)
      .toISOString()
      .slice(11, 16);
    const hoursAndMinutesRenderer =
      hoursAndMinutes.slice(0, 2) + "h " + hoursAndMinutes.slice(3, 5) + "s";
    return hoursAndMinutesRenderer;
  };

  const getChargingStats = async (requestStartDate, requestEndDate) => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke(
          "GetChargingStats",
          charger.chargerId,
          0,
          1,
          requestStartDate,
          requestEndDate
        )
        .then((chargingStats) => {
          setChargingStats(chargingStats);
        });
    }
  };

  useEffect(() => {
    if (date) {
      const requestStartDate = moment(date).format("YYYY-MM-DD");
      const requestEndDate = moment(getEndMonthDate(date)).format("YYYY-MM-DD");
      getChargingStats(requestStartDate, requestEndDate);
    } else getChargingStats(null, null);
  }, [connection]);

  return (
    <>
      {chargingStats && (
        <View
          style={{
            ...style.wrapper,
          }}
        >
          <View style={style.upperTextContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={style.image}
                source={require("../../assets/greenLighting.png")}
              />

              <Text style={[style.locationText]}>{charger.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...style.chargingStatusText,
                }}
              >
                {charger.state}
              </Text>
              <View
                style={{
                  ...style.circle,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
          <View style={style.lastUsedWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  ...style.circle,
                  marginRight: 10,
                }}
              />

              <Text style={[style.locationText]}>
                {chargeLastUsed(charger)}
              </Text>
            </View>

            <Text
              style={{
                ...style.chargingStatusText,
              }}
            >
              {chargeDate(charger)}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={{
                  ...style.smallText,
                }}
              >
                Energy Delivered
              </Text>

              <Text
                style={{
                  ...style.chargingValuesText,
                }}
              >
                {chargingStats.totalKWh}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={{
                  ...style.smallText,
                }}
              >
                Charge Duration
              </Text>
              <Text
                style={{
                  ...style.chargingValuesText,
                }}
              >
                {secondsInHoursAndMinutes(chargingStats.totalChargedTimeInSec)}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={{
                  ...style.smallText,
                }}
              >
                Amount Paid
              </Text>
              <Text
                style={{
                  ...style.chargingValuesText,
                }}
              >
                {chargingStats.totalCost}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default TotalChargeCard;
