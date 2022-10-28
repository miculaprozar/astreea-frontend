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
        <View style={charging.wrapper}>
          <Pressable onPress={() => onClick && onClick()} style={{ flex: 1 }}>
            <View style={charging.lastUsedWrapper}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    ...charging.circle,
                    marginRight: 10,
                    backgroundColor: circleColor(chargerState, 0),
                  }}
                />

                <Text style={[charging.locationText]}>
                  {chargeLastUsed(chargerState)}
                </Text>
              </View>

              <Text style={charging.chargingStatusText}>
                {chargeDate(chargerState)}
              </Text>
            </View>
            <View style={charging.bottomWrapper}>
              <View style={{ marginTop: "auto" }}>
                <Text style={charging.smallText}>Energy Delivered</Text>

                <Text style={charging.chargingValuesText}>
                  {chargerState.lastChargingSession
                    ? (
                        chargerState.lastChargingSession.charged / 10000
                      ).toFixed(2) + "kWh"
                    : "--"}
                </Text>
              </View>
              <View style={{ marginTop: "auto" }}>
                <Text style={charging.smallText}>Charge Duration</Text>
                <Text style={charging.chargingValuesText}>
                  {chargerState.lastChargingSession &&
                  chargerState.lastChargingSession.chargedTimeInSec >= 60
                    ? formatDuration(
                        chargerState.lastChargingSession.chargedTimeInSec
                      )
                    : "--"}
                </Text>
              </View>
              <View style={{ marginTop: "auto" }}>
                <Text style={charging.smallText}>Cost</Text>
                <Text style={charging.chargingValuesText}>
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
