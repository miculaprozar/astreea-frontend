import React, { useEffect, useRef, useState } from "react";

import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Pressable,
} from "react-native";
import { charging } from "./CardStyle";
import useTime from "../../helpers/useTime";
import { chargeDate, chargeLastUsed } from "../../helpers/formatFunctions";
import {
  getBGColorByStatus,
  getTextColorByStatus,
  headerTextColor,
  circleColor,
  getLightingImageByStatus,
} from "./getCardColorsByStatus";

import _ from "lodash";

const ChargerCard = ({
  price,
  kwh,
  time,
  charger,
  onClick,
  isDetails = false,
}) => {
  const [timer, setStartTimer] = useTime();
  const chargingState = useRef(null);

  const [chargerState, setChargerState] = useState(charger);

  const connection = global.connection;

  connection.on("ChargerDetailsChanged", (changedCharger) => {
    if (changedCharger.chargerId === charger.chargerId) {
      setChargerState(changedCharger);
    }
  });

  useEffect(() => {
    setChargerState(charger);
  }, [charger]);

  // useEffect(() => {
  //   if (
  //     charger.isInCharge &&
  //     (chargingState.current === null || chargingState.current === false)
  //   ) {
  //     setStartTimer(new Date(charger.lastCharge[0].startDate));
  //     chargingState.current = true;
  //   }
  // }, [charger]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onClick && onClick()}>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(chargerState.state),
            ...(isDetails && {
              backgroundColor: "rgba(255,255,255,0.30)",
              borderWidth: 1,
              borderColor: "white",
            }),
            ...(chargerState.isAdmin &&
              chargerState.state === "Disconnected/Error" && { height: 180 }),
          }}
        >
          <View style={charging.upperTextContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={charging.image}
                source={getLightingImageByStatus(chargerState.state)}
              />

              <Text
                style={[
                  charging.locationText,
                  {
                    color: headerTextColor(chargerState, isDetails),
                  },
                ]}
              >
                {chargerState.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: headerTextColor(chargerState, isDetails),
                }}
              >
                {chargerState.state}
              </Text>
              <View
                style={{
                  ...charging.circle,
                  marginLeft: 10,
                  backgroundColor: circleColor(chargerState, 1),
                }}
              />
            </View>
          </View>
          <View style={charging.lastUsedWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  ...charging.circle,
                  marginRight: 10,
                  backgroundColor: circleColor(chargerState, 0),
                }}
              />

              <Text
                style={[
                  charging.locationText,
                  {
                    color: getTextColorByStatus(chargerState.state, isDetails),
                  },
                  { fontSize: 12 },
                ]}
              >
                {chargeLastUsed(chargerState)}
              </Text>
            </View>

            <Text
              style={{
                ...charging.chargingStatusText,
                color: getTextColorByStatus(chargerState.state, isDetails),
                fontSize: 10,
              }}
            >
              {chargeDate(chargerState)}

              {/* {"chargedatefct"} */}
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
                  ...charging.smallText,
                  ...(isDetails && { color: "white" }),
                }}
              >
                Energy Delivered
              </Text>

              <Text
                style={{
                  ...charging.chargingValuesText,
                  color: getTextColorByStatus(chargerState.state, isDetails),
                }}
              >
                {kwh}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={{
                  ...charging.smallText,
                  ...(isDetails && { color: "white" }),
                }}
              >
                Charge Duration
              </Text>
              <Text
                style={{
                  ...charging.chargingValuesText,
                  color: getTextColorByStatus(charger.state, isDetails),
                }}
              >
                {chargerState.isInCharge ? timer : time}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={{
                  ...charging.smallText,
                  ...(isDetails && { color: "white" }),
                }}
              >
                Amount Paid
              </Text>
              <Text
                style={{
                  ...charging.chargingValuesText,
                  color: getTextColorByStatus(chargerState.state, isDetails),
                }}
              >
                {price}
              </Text>
            </View>
          </View>
          {chargerState.isAdmin &&
          chargerState.state === "Disconnected/Error" ? (
            <Pressable
              style={charging.pairButtonWrapper}
              onPress={() => console.log("Pressed")}
            >
              <Text style={charging.pairButtonText}>PAIR AGAIN</Text>
            </Pressable>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ChargerCard;
