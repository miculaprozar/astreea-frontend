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

const ChargerCard = ({ charger, onClick, isDetails = false }) => {
  const [chargerState, setChargerState] = useState(charger);

  const navigation = useNavigation();

  const connection = global.connection;
  const cert = global.cert;

  const {
    ChargerSettings: { name: chargerSettingsRoute },
    ScheduleV2: { name: ScheduleRoute },
  } = routes;

  connection.on("ChargerStateChanged", (chargerStateChange) => {
    if (chargerState.serialNumberCon === chargerStateChange.serialNumberCon) {
      console.log("New state:" + chargerStateChange.state);
      setChargerState((prevState) => ({
        ...prevState,
        state: chargerStateChange.state,
      }));
    }
  });

  connection.on("ChargingChanged", (chargingChange) => {
    // if (chargerState.serialNumberCon === chargingChange.serialNumberCon) {
    //   var newState = chargerState;
    //   newState.LastChargingSession = chargingChange;
    //   setChargerState(newState);
    // }
  });

  useEffect(() => {
    setChargerState(charger);
  }, [charger]);

  const StartStopCharging = async () => {
    // changeLoader(true);

    try {
      // setTriggerRefresh(true);
      if (chargerState && chargerIsCharging(chargerState)) {
        if (connection.state == HubConnectionState.Connected) {
          await connection
            .invoke("StopCharging", chargerState.serialNumberCon, cert)
            .then((e) => {
              console.log("StopCharging performed", e);
            });
        }
      } else {
        if (connection.state == HubConnectionState.Connected) {
          await connection
            .invoke("StartCharging", chargerState.serialNumberCon, cert)
            .then((e) => {
              console.log("StartCharging performed", e);
            });
        }
      }

      // getChargerDetails();
      // setTriggerRefresh(false);
      // changeLoader(false);
    } catch (e) {
      console.log("ERROR IN START STOP CHARGING", e.response.data);
    }
  };

  const chargerIsCharging = (chargerState) =>
    chargerState.state === "Charging" ? true : false;

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

          {/* </TouchableWithoutFeedback> */}

          {!isDetails && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <ChargerButton
                isCharging={chargerIsCharging(chargerState)}
                isDisabled={chargerState.state === "Occupied" ? true : false}
                onPressAction={() =>
                  chargerState.state !== "Occupied" && StartStopCharging()
                }
              />
              <ChargerButton
                isCharging={chargerIsCharging(chargerState)}
                isSecondary={true}
                onPressAction={() =>
                  navigation.navigate(chargerSettingsRoute, {
                    chargerId: chargerState.ChargingSessionId,
                  })
                }
              />

              <ChargerButton
                isCharging={chargerIsCharging(chargerState)}
                isSchedule={true}
                onPressAction={() => navigation.navigate(ScheduleRoute)}
              />
            </View>
          )}
          {/* {chargerState.isAdmin && chargerState.state === "OutOfOrder" ? (
            <Pressable
              style={charging.pairButtonWrapper}
              onPress={() => console.log("Pressed")}
            >
              <Text style={charging.pairButtonText}>PAIR AGAIN</Text>
            </Pressable>
          ) : null} */}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ChargerCard;
