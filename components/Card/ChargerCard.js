import React, { useEffect, useState } from "react";

import {
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  chargeDate,
  chargeLastUsed,
  formatDuration,
} from "../../helpers/formatFunctions";
import { charging } from "./CardStyle";
import {
  circleColor,
  getBGColorByStatus,
  getLightingImageByStatus,
  getTextColorByStatus,
  headerTextColor,
} from "./getCardColorsByStatus";
import ChargerButton from "../ChargerButton/ChargerButton";
import routes from "../../routes";
import { useNavigation } from "@react-navigation/native";
import { HubConnectionState } from "@microsoft/signalr";

const ChargerCard = ({
  charger,
  onClick,
  isDetails = false,
  startStopOngoing,
  setStartStopOngoing,
  commandTimeoutId,
}) => {
  const [chargerState, setChargerState] = useState(charger);

  const connection = global.connection;
  const cert = global.cert;

  const {
    ChargerSettings: { name: chargerSettingsRoute },
    ScheduleV2: { name: ScheduleRoute },
  } = routes;

  useEffect(() => {
    setChargerState(charger);

    if (!global["ChargerStateChanged=" + chargerState.serialNumberCon]) {
      console.log(
        "Subscribed to:" + "ChargerStateChanged=" + chargerState.serialNumberCon
      );

      global["ChargerStateChanged=" + chargerState.serialNumberCon] = true;
      connection.on(
        "ChargerStateChanged=" + chargerState.serialNumberCon,
        (newState) => {
          //console.log("New state:" + newState);
          setChargerState((prevState) => ({
            ...prevState,
            state: newState,
          }));

          if (newState !== "Preparing") {
            clearTimeout(commandTimeoutId);
            setStartStopOngoing(false);
          }
        }
      );
    }

    if (!global["ChargingChanged=" + chargerState.serialNumberCon]) {
      //console.log("Subscribed to:" + 'ChargingChanged=' + chargerState.serialNumberCon);

      global["ChargingChanged=" + chargerState.serialNumberCon] = true;
      connection.on(
        "ChargingChanged=" + chargerState.serialNumberCon,
        (chargingChange) => {
          //console.log("New charging event:");
          //console.log(util.inspect(chargingChange, false, null, true));
          setChargerState((prevState) => ({
            ...prevState,
            lastChargingSession: chargingChange,
          }));
        }
      );
    }
  }, [charger]);

  return (
    <>
      <TouchableWithoutFeedback>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(chargerState.state),
            ...(isDetails && {
              backgroundColor: "rgba(255,255,255,0.30)",
              height: 125,
            }),
            // ...(chargerState.isAdmin &&
            //   chargerState.state === "OutOfOrder" && { height: 190 }),
          }}
        >
          <Pressable onPress={() => onClick && onClick()} style={{ flex: 1 }}>
            {!isDetails && (
              <View
                style={charging.upperTextContainer}
                onPress={() => onClick && onClick()}
                onT
              >
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
            )}
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
                      color: getTextColorByStatus(
                        chargerState.state,
                        isDetails
                      ),
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
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginTop: "auto" }}>
                <Text
                  style={{
                    ...charging.smallText,
                    ...(isDetails && { color: "white" }),
                    ...(chargerState.state === "Charging" && {
                      color: "white",
                    }),
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
                  {chargerState.lastChargingSession
                    ? (
                        chargerState.lastChargingSession.charged / 10000
                      ).toFixed(2) + "kWh"
                    : "--"}
                </Text>
              </View>
              <View style={{ marginTop: "auto" }}>
                <Text
                  style={{
                    ...charging.smallText,
                    ...(isDetails && { color: "white" }),
                    ...(chargerState.state === "Charging" && {
                      color: "white",
                    }),
                  }}
                >
                  Charge Duration
                </Text>
                <Text
                  style={{
                    ...charging.chargingValuesText,
                    color: getTextColorByStatus(chargerState.state, isDetails),
                  }}
                >
                  {chargerState.lastChargingSession
                    ? formatDuration(
                        chargerState.lastChargingSession.chargedTimeInSec
                      )
                    : "--"}
                </Text>
              </View>
              <View style={{ marginTop: "auto" }}>
                <Text
                  style={{
                    ...charging.smallText,
                    ...(isDetails && { color: "white" }),
                    ...(chargerState.state === "Charging" && {
                      color: "white",
                    }),
                  }}
                >
                  Cost
                </Text>
                <Text
                  style={{
                    ...charging.chargingValuesText,
                    color: getTextColorByStatus(chargerState.state, isDetails),
                  }}
                >
                  {chargerState.lastChargingSession
                    ? "€" +
                      chargerState.lastChargingSession.chargedCost.toFixed(2)
                    : "--"}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ChargerCard;
