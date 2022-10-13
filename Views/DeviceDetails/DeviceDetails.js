import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
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

import { HubConnectionState } from "@microsoft/signalr";

const DeviceDetails = (props) => {
  const { navigation, route } = props;
  const {
    route: {
      params: { serialNumberCon },
    },
  } = props;

  const {
    ChargerSettings: { name: chargerSettingsRoute },
    Schedule: { name: ScheduleRoute },
  } = routes;

  const connection = global.connection;
  const cert = global.cert;

  const [charger, setCharger] = useState(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(getStartMonthDate(new Date()));

  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const StartStopCharging = async () => {
    changeLoader(true);

    console.log("THE CHARGER ID:", serialNumberCon);

    try {
      setTriggerRefresh(true);
      if (charger && chargerIsCharging(charger)) {
        if (connection.state == HubConnectionState.Connected) {
          await connection.invoke("StopCharging", serialNumberCon, cert).then(() => {
            console.log("StopCharging performed");
          });
        }
      } else {
        if (connection.state == HubConnectionState.Connected) {
          await connection.invoke("StartCharging", serialNumberCon, cert).then(() => {
            console.log("StartCharging performed");
          });
        }
      }

      getChargerDetails();
      setTriggerRefresh(false);
      changeLoader(false);
    } catch (e) {
      console.log("ERROR IN START STOP CHARGING", e.response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getChargerDetails();
      setIsLoading(false);
    }, [connection])
  );

  const onSubmitDate = (date) => {
    setDate(date);
    setIsCalendarOpen(!isCalendarOpen);
  };

  const changeLoader = (boolean) => {
    if (!boolean) {
      setIsLoading(false);
    } else setIsLoading(true);
  };

  const chargerIsCharging = (charger) =>
    charger.state === "Charging" ? true : false;

  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}
      {!triggerRefresh && charger && (
        <>
          <Layout customBackgroundUrl={DetailsBackground}>
            <Layout.Header>
              <HeaderNavigator navigation={navigation} route={route} />
            </Layout.Header>
            <Layout.Body>
              <View style={{ marginTop: "auto" }}>
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
                  onPressAction={() =>
                    charger.state !== "Occupied" && StartStopCharging()
                  }
                />
                <LargeChargerButton
                  isSchedule={true}
                  onPressAction={() => navigation.navigate(ScheduleRoute)}
                />
              </View>
            </Layout.Body>
            <Layout.Footer style={{ flex: 2, backgroundColor: "red" }}>
              {/* {!chargerIsCharging(charger) ? (
                <TotalChargeCard charger={charger} date={date} />
              ) : ( */}
              <ChargerCard
                // kwh={kwhRenderer(charger.lastChargingSession)}
                // time={hourMinutesRenderer(charger.lastChargingSession)}
                // price={priceRenderer(charger.lastChargingSession)}
                // key={getUniqueKey(charger)}
                charger={charger}
                isDetails
              ></ChargerCard>
              {/* // )} */}
              <View style={style.tittleButtonWrapper}>
                {/* <View style={{ flex: 1 }}>
                  <ChargerButton
                    marginRight={5}
                    isSecondary={true}
                    onPressAction={() =>
                      navigation.navigate(chargerSettingsRoute, {
                        chargerId: chargerId,
                      })
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ChargerButton
                    isSchedule={true}
                    marginLeft={2.5}
                    marginRight={2.5}
                    onPressAction={() => navigation.navigate(ScheduleRoute)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ChargerButton
                    marginLeft={5}
                    isCharging={chargerIsCharging(charger)}
                    isDisabled={charger.state === "Occupied" ? true : false}
                    onPressAction={() =>
                      charger.state !== "Occupied" && StartStopCharging()
                    }
                  />
                </View> */}
              </View>
              <ChargerSettingsCard />
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
