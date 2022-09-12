import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
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
import DetailsCard from "../../components/Card/DetailsCard";
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

import { HubConnectionState } from "@microsoft/signalr";

const DeviceDetails = (props) => {
  const { navigation, route } = props;
  const {
    route: {
      params: { chargerId },
    },
  } = props;

  const {
    ChargerSettings: { name: chargerSettingsRoute },
  } = routes;

  const connection = global.connection;

  const [charger, setCharger] = useState(null);
  const [chargingHistory, setChargingHistory] = useState(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(getStartMonthDate(new Date()));

  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getChargerDetails = async () => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke("GetChargerDetails", chargerId)
        .then((charger) => {
          setCharger(charger);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  const getChargingHistory = async (requestStartDate, requestEndDate) => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke(
          "GetChargingHistory",
          chargerId,
          0,
          1,
          requestStartDate,
          requestEndDate
        )
        .then((chargingHistory) => {
          setChargingHistory(chargingHistory);
        });
    }
  };

  const StartStopCharging = async () => {
    changeLoader(true);

    try {
      setTriggerRefresh(true);
      if (charger && chargerIsCharging(charger)) {
        if (connection.state == HubConnectionState.Connected) {
          await connection.invoke("StopCharging", chargerId).then(() => {
            console.log("StopCharging performed");
          });
        }
      } else {
        if (connection.state == HubConnectionState.Connected) {
          await connection.invoke("StartCharging", chargerId).then(() => {
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

  useEffect(() => {
    if (date) {
      const requestStartDate = moment(date).format("YYYY-MM-DD");
      const requestEndDate = moment(getEndMonthDate(date)).format("YYYY-MM-DD");
      getChargingHistory(requestStartDate, requestEndDate);
    }
  }, [connection]);

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

  const secondsInHoursAndMinutes = (seconds) => {
    const hoursAndMinutes = new Date(seconds * 1000)
      .toISOString()
      .slice(11, 16);
    const hoursAndMinutesRenderer =
      hoursAndMinutes.slice(0, 2) + "h " + hoursAndMinutes.slice(3, 5) + "s";
    return hoursAndMinutesRenderer;
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      {!triggerRefresh && charger && chargingHistory && (
        <>
          <Layout customBackgroundUrl={DetailsBackground}>
            <Layout.Header>
              <HeaderNavigator navigation={navigation} route={route} />
            </Layout.Header>
            <Layout.Body>
              {!chargerIsCharging(charger) && (
                <View style={style.table_container}>
                  <PillButton
                    text={getFullMonthName(date)}
                    onPressAction={() => setIsCalendarOpen(true)}
                  />
                  <Table
                    chargerId={chargerId}
                    startDate={date}
                    endDate={getEndMonthDate(date)}
                  />
                </View>
              )}
            </Layout.Body>
            <Layout.Footer style={{ flex: 2, backgroundColor: "red" }}>
              {!chargerIsCharging(charger) ? (
                <DetailsCard
                  name={charger.name}
                  kwh={chargingHistory.totalKWh}
                  price={chargingHistory.totalCost}
                  time={secondsInHoursAndMinutes(
                    chargingHistory.totalChargedTimeInSec
                  )}
                  charger={charger}
                />
              ) : (
                <ChargerCard
                  name={charger.name}
                  kwh={kwhRenderer(charger.lastChargingSession)}
                  time={hourMinutesRenderer(charger.lastChargingSession)}
                  price={priceRenderer(charger.lastChargingSession)}
                  key={getUniqueKey(charger)}
                  charger={charger}
                  isDetails
                ></ChargerCard>
              )}
              <View style={style.tittleButtonWrapper}>
                <View style={{ flex: 1 }}>
                  <ChargerButton
                    marginRight={10}
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
                    marginLeft={10}
                    isCharging={chargerIsCharging(charger)}
                    onPressAction={() => StartStopCharging()}
                  />
                </View>
              </View>
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
