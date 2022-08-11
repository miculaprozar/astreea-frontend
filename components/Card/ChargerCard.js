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

const ChargerCard = ({ name, price, kwh, time, charger, onClick }) => {
  const [timer, setStartTimer] = useTime();
  const chargingState = useRef(null);

  // console.log("THE CARGER IS:", charger);

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
      <TouchableWithoutFeedback onPress={() => onClick()}>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(charger.appState),
            ...(charger.isAdmin && charger.appState === 5 && { height: 170 }),
          }}
        >
          <View style={charging.upperTextContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={charging.image}
                source={getLightingImageByStatus(charger.appState)}
              />

              <Text
                style={[
                  charging.locationText,
                  {
                    color: headerTextColor(charger),
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
                  color: headerTextColor(charger),
                }}
              >
                {charger.appStateName}
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
                  { color: getTextColorByStatus(charger.appState) },
                  { fontSize: 12 },
                ]}
              >
                {chargeLastUsed(charger)}
              </Text>
            </View>

            <Text
              style={{
                ...charging.chargingStatusText,
                color: getTextColorByStatus(charger.appState),
                fontSize: 10,
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
              <Text style={charging.smallText}>Energy Delivered</Text>

              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appState),
                }}
              >
                {kwh}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text style={charging.smallText}>Charge Duration</Text>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appState),
                }}
              >
                {charger.isInCharge ? timer : time}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text style={charging.smallText}>Amount Paid</Text>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appState),
                }}
              >
                {price}
              </Text>
            </View>
          </View>
          {charger.isAdmin && charger.appState === 5 ? (
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
