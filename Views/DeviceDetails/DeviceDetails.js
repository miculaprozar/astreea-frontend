import React, { useCallback, useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import DetailsBackground from "../../assets/chargingScreenGreen.jpg";
import DetailsBackgroundCharging from "../../assets/chargingScreen.jpg";

import ChargerButton from "../../components/ChargerButton/ChargerButton";
import PillButton from "../../components/PillButton/PillButton";
import Table from "../../components/Table/Table";
import Calendar from "../../general_components/Calendar/Calendar";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { getUniqueKey } from "../../helpers/checkers";
import routes from "../../routes";
import { style } from "./DeviceDetails.style";

import ChargerCard from "../../components/Card/ChargerCard";
import TotalChargeCard from "../../components/Card/TotalChargeCard";
import Layout from "../../general_components/Layout";
import Loader from "../../general_components/Loader/Loader";
import {
  getEndMonthDate,
  getFullMonthName,
  getStartMonthDate,
} from "../../helpers/dateFormatFunctions";
import {
  hourMinutesRenderer,
  kwhRenderer,
  priceRenderer,
} from "../../helpers/formatFunctions";
import { chargeDate, chargeLastUsed } from "../../helpers/formatFunctions";
import LargeChargerButton from "../../components/LargeChargerButton/LargeChargerButton";
import ChargerSettingsCard from "../../components/ChargerSettingsCard/ChargerSettingsCard";
import * as Haptics from "expo-haptics";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";

import { HubConnectionState } from "@microsoft/signalr";

const DeviceDetails = (props) => {
  const { navigation, route } = props;

  const {
    route: {
      params: { serialNumberCon },
    },
  } = props;

  // const serialNumberCon = props.route.params.serialNumberCon;
  const parentStack = navigation.getParent();
  const {
    ChargerSettings: { name: chargerSettingsRoute },
    ScheduleV2: { name: ScheduleRoute },
  } = routes;

  const connection = global.connection;
  const cert = global.cert;

  var commandTimeoutId = -1;

  const [charger, setCharger] = useState(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(getStartMonthDate(new Date()));
  const [startStopOngoing, setStartStopOngoing] = useState(false);

  const { connectionStatus } = useContext(AuthContext);

  const getChargerDetails = async () => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke("GetChargerDetails", serialNumberCon)
        .then((charger) => {
          setCharger(charger);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  connectionStatus &&
    connection.on("ChargerStateChanged=" + serialNumberCon, (newState) => {
      setCharger((prevState) => ({
        ...prevState,
        state: newState,
      }));
    });

  const StartStopCharging = async () => {
    if (startStopOngoing == false) {
      setStartStopOngoing(true);

      commandTimeoutId = setTimeout(() => {
        setStartStopOngoing(false);
      }, 2000);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      try {
        if (charger && chargerIsCharging(charger)) {
          if (connection.state == HubConnectionState.Connected) {
            await connection
              .invoke("StopCharging", serialNumberCon, cert)
              .then((e) => {
                console.log("StopCharging performed", e);
              });
          }
        } else {
          if (connection.state == HubConnectionState.Connected) {
            await connection
              .invoke("StartCharging", serialNumberCon, cert)
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

  useFocusEffect(
    useCallback(() => {
      connectionStatus && getChargerDetails();
    }, [connectionStatus])
  );

  const onSubmitDate = (date) => {
    setDate(date);
    setIsCalendarOpen(!isCalendarOpen);
  };

  const chargerIsCharging = (charger) =>
    charger.state === "Charging" ? true : false;

  return (
    <>
      {charger && (
        <>
          <Layout
            customBackgroundUrl={
              chargerIsCharging(charger)
                ? DetailsBackgroundCharging
                : DetailsBackground
            }
            scrollView={true}
          >
            <Layout.Header>
              <HeaderNavigator navigation={navigation} route={route} />
            </Layout.Header>
            <Layout.Body>
              <View style={{ marginBottom: "auto" }}>
                <Text style={style.title}>{charger.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={style.description}>
                    {chargeLastUsed(charger) + ": "}
                  </Text>
                  <Text
                    style={{
                      ...style.description,
                      textDecorationLine: "underline",
                    }}
                  >
                    {chargeDate(charger)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                >
                  <LargeChargerButton
                    marginRight={20}
                    isCharging={chargerIsCharging(charger)}
                    isDisabled={
                      charger.state === "Occupied" || startStopOngoing
                        ? true
                        : false
                    }
                    onPressAction={() =>
                      charger.state !== "Occupied" &&
                      !startStopOngoing &&
                      StartStopCharging()
                    }
                  />
                  <LargeChargerButton
                    isSchedule={true}
                    onPressAction={() =>
                      navigation.navigate(ScheduleRoute, {
                        chargerId: charger.chargerId,
                        serialNumberCon: serialNumberCon,
                      })
                    }
                  />
                </View>
              </View>
            </Layout.Body>
            <Layout.Footer style={{ flex: 2, backgroundColor: "red" }}>
              <ChargerCard
                setStartStopOngoing={setStartStopOngoing}
                startStopOngoing={startStopOngoing}
                charger={charger}
                isDetails
                commandTimeoutId={commandTimeoutId}
              />
              {/* {charger.state !== "Charging" &&
                charger.state !== "Suspended" &&
                charger.state !== "Authorized" && (
                  <ChargerSettingsCard chargerId={charger.chargerId} />
                )} */}
              <Calendar
                isOpen={isCalendarOpen}
                selected={date}
                handleSubmitDate={onSubmitDate}
              ></Calendar>
            </Layout.Footer>
          </Layout>
        </>
      )}
    </>
  );
};

export default DeviceDetails;
