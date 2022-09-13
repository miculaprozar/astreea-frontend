import React, { useState, useEffect } from "react";

import { Image, Text, View } from "react-native";
import { chargeDate, chargeLastUsed } from "../../helpers/formatFunctions";
import { style } from "./DetailsCard.style";

const DetailsCard = ({ price, kwh, time, charger, chargingHistory }) => {
  const [chargerState, setChargerState] = useState(charger);
  const [chargingHistoryState, setChargingHistoryState] =
    useState(chargingHistory);

  const connection = global.connection;

  connection.on("ChargerDetailsChanged", (changedCharger) => {
    if (changedCharger.chargerId === charger.chargerId) {
      setChargerState(changedCharger);
    }
  });

  connection.on("ChargingHistoryChanged", (changedChargingHistory) => {
    console.log("ASD");
    if (changedChargingHistory.userId === chargingHistory.userId) {
      setChargingHistoryState(chargingHistory);
    }
  });

  useEffect(() => {
    console.log("THE HISTORY STATE:", chargingHistoryState.userId);
  }, [chargingHistoryState]);

  useEffect(() => {
    setChargingHistoryState(chargingHistory);
  }, [chargingHistory]);

  useEffect(() => {
    setChargerState(charger);
  }, [charger]);

  return (
    <>
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

            <Text style={[style.locationText]}>{chargerState.name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                ...style.chargingStatusText,
              }}
            >
              {chargerState.state}
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
              {chargeLastUsed(chargerState)}
            </Text>
          </View>

          <Text
            style={{
              ...style.chargingStatusText,
            }}
          >
            {chargeDate(chargerState)}
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
              {kwh}
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
              {time}
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
              {price}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DetailsCard;
