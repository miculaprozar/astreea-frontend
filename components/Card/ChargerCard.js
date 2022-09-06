import React, { useEffect, useRef } from "react";

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

const ChargerCard = ({
  name,
  price,
  kwh,
  time,
  charger,
  onClick,
  isDetails = false,
}) => {
  const [timer, setStartTimer] = useTime();
  const chargingState = useRef(null);

  useEffect(() => {
    if (
      charger.isInCharge &&
      (chargingState.current === null || chargingState.current === false)
    ) {
      setStartTimer(new Date(charger.lastCharge[0].startDate));
      chargingState.current = true;
    }
  }, [charger]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onClick && onClick()}>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(charger.state),
            ...(isDetails && {
              backgroundColor: "rgba(255,255,255,0.30)",
              borderWidth: 1,
              borderColor: "white",
            }),
            ...(charger.isAdmin &&
              charger.state === "Disconnected/Error" && { height: 180 }),
          }}
        >
          <View style={charging.upperTextContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={charging.image}
                source={getLightingImageByStatus(charger.state)}
              />

              <Text
                style={[
                  charging.locationText,
                  {
                    color: headerTextColor(charger, isDetails),
                  },
                ]}
              >
                {name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: headerTextColor(charger, isDetails),
                }}
              >
                {charger.state}
              </Text>
              <View
                style={{
                  ...charging.circle,
                  marginLeft: 10,
                  backgroundColor: circleColor(charger, 1),
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
                  backgroundColor: circleColor(charger, 0),
                }}
              />

              <Text
                style={[
                  charging.locationText,
                  { color: getTextColorByStatus(charger.state, isDetails) },
                  { fontSize: 12 },
                ]}
              >
                {chargeLastUsed(charger)}
              </Text>
            </View>

            <Text
              style={{
                ...charging.chargingStatusText,
                color: getTextColorByStatus(charger.state, isDetails),
                fontSize: 10,
              }}
            >
              {chargeDate(charger)}

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
                  color: getTextColorByStatus(charger.state, isDetails),
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
                {charger.isInCharge ? timer : time}
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
                  color: getTextColorByStatus(charger.state, isDetails),
                }}
              >
                {price}
              </Text>
            </View>
          </View>
          {charger.isAdmin && charger.state === "Disconnected/Error" ? (
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
