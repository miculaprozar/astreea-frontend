import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  circleColor,
  getBGColorByStatus,
  getLightingImageByStatus,
  getTextColorByStatus,
  headerTextColor,
} from "./getCardColorsByStatus";
import routes from "../../routes";
import {
  formatDuration,
  chargeDate,
  chargeLastUsed,
} from "../../helpers/formatFunctions";
import ChargerButton from "../ChargerButton/ChargerButton";
import { charging } from "./CardStyle";
import { useNavigation } from "@react-navigation/native";
import { HubConnectionState } from "@microsoft/signalr";
import * as Haptics from "expo-haptics";

const HomeChargerCard = ({ charger, onClick }) => {
  const [chargerState, setChargerState] = useState(charger);
  const [startStopOngoing, setStartStopOngoing] = useState(false);

  var commandTimeoutId = -1;

  const navigation = useNavigation();

  const connection = global.connection;
  const cert = global.cert;

  const {
    ScheduleV2: { name: ScheduleRoute },
    DeviceDetails: { name: DeviceDetailsRoute },
    ChargerSettings: { name: ChargerSettingsRoute },
  } = routes;

  useEffect(() => {
    setChargerState(charger);
    // if (charger.serialNumberCon == "SNBTA1_2") {
    //   console.log(util.inspect(charger, false, null, true));
    // }

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

  const StartStopCharging = async () => {
    if (startStopOngoing == false) {
      setStartStopOngoing(true);

      commandTimeoutId = setTimeout(() => {
        setStartStopOngoing(false);
      }, 30000);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      try {
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
      } catch (e) {
        console.log("ERROR IN START STOP CHARGING", e.response.data);
      }
    } else {
      console.log(
        "Cannot perform Start/Stop operation while another operation is already in progress."
      );
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
          }}
        >
          <Pressable onPress={() => onClick && onClick()} style={{ flex: 1 }}>
            {
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
                        color: headerTextColor(chargerState, false),
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
                      color: headerTextColor(chargerState, false),
                    }}
                  >
                    {chargerState.state}
                  </Text>
                  {chargerState.state == "Charging" ? (
                    <Image
                      style={{
                        ...charging.circle,
                      }}
                      source={require("../../assets/bullet.gif")}
                    />
                  ) : (
                    <View
                      style={{
                        ...charging.circle,
                        backgroundColor: circleColor(chargerState, 1),
                      }}
                    />
                  )}
                </View>
              </View>
            }
            <View style={charging.lastUsedWrapper}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View />

                <Text
                  style={[
                    charging.locationText,
                    {
                      color: getTextColorByStatus(chargerState.state, false),
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
                  color: getTextColorByStatus(chargerState.state, false),
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
                    ...(chargerState.state === "Charging" && {
                      color: "white",
                    }),
                  }}
                >
                  Energy Delievered
                </Text>

                <Text
                  style={{
                    ...charging.chargingValuesText,
                    color: getTextColorByStatus(chargerState.state, false),
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
                    color: getTextColorByStatus(chargerState.state, false),
                  }}
                >
                  {chargerState.lastChargingSession &&
                  chargerState.lastChargingSession.chargedTimeInSec >= 60
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
                    color: getTextColorByStatus(chargerState.state, false),
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
              isDisabled={
                chargerState.state === "Occupied" || startStopOngoing
                  ? true
                  : false
              }
              isStop={
                chargerState.state === "Authorized" ||
                chargerState.state === "Suspended"
              }
              onPressAction={() =>
                chargerState.state !== "Occupied" && StartStopCharging()
              }
            />
            <ChargerButton
              isCharging={chargerIsCharging(chargerState)}
              isSecondary={true}
              onPressAction={() =>
                navigation.navigate(ChargerSettingsRoute, {
                  serialNumberCon: chargerState.serialNumberCon,
                  chargerId: chargerState.chargerId,
                })
              }
            />
            {/* <ChargerButton
              isCharging={chargerIsCharging(chargerState)}
              isSchedule={true}
              onPressAction={() =>
                navigation.navigate(ScheduleRoute, {
                  chargerId: charger.chargerId,
                })
              }
            /> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default HomeChargerCard;
