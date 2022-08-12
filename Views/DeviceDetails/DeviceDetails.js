import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { apiFactory } from "../../api/index";
import Card from "../../components/Card/Card";
import ChargerButton from "../../components/ChargerButton/ChargerButton";
import PillButton from "../../components/PillButton/PillButton";
import Table from "../../components/Table/Table";
import Calendar from "../../general_components/Calendar/Calendar";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import routes from "../../routes";
import { style } from "./DeviceDetails.style";
import moment from "moment";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import { getUniqueKey } from "../../helpers/checkers";

import Layout from "../../general_components/Layout";
import {
  getEndMonthDate,
  getFullMonthName,
  getStartMonthDate,
} from "../../helpers/dateFormatFunctions";
import {
  formatMs,
  hourMinutesRenderer,
  kwhRenderer,
  priceRenderer,
} from "../../helpers/formatFunctions";
import useTime from "../../helpers/useTime";
import ChargerCard from "../../components/Card/ChargerCard";
import DetailsCard from "../../components/Card/DetailsCard";

const DeviceDetails = (props) => {
  const { navigation, route } = props;
  const {
    route: {
      params: { serialNumber },
    },
  } = props;

  const {
    ChargerSettings: { name: chargerSettingsRoute },
  } = routes;

  const [charger, setCharger] = useState(null);
  const [totalCharge, setTotalCharge] = useState(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(getStartMonthDate(new Date()));

  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const demoGetEndKwh = (startDate, endDate) => {
    var diffMs = endDate - startDate;
    var diffSec = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000);
    return Math.abs(diffSec * 0.2);
  };

  const StartStopCharging = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      setTriggerRefresh(true);
      const lastCharge = charger.lastCharge[0];
      if (charger && charger.isInCharge) {
        await apiFactory()
          .data.device()
          .startStopCharging(
            {
              chargerId: charger.id,
              voltage: 1,
              current: 1,
              power: 1,
              endKwh: lastCharge.startKwh + demoGetEndKwh(date, new Date()),
            },
            token
          );
      } else {
        await apiFactory().data.device().startStopCharging(
          {
            chargerId: charger.id,
            voltage: 1,
            current: 1,
            power: 1,
            startKwh: lastCharge.endKwh,
          },
          token
        );
      }

      getChargerInfo();
      setTriggerRefresh(false);
      setIsLoading(false);
    } catch (e) {
      console.log("ERROR IN START STOP CHARGING", e.response.data);
    }
  };

  const getChargerTotalData = async (chargerID, dates) => {
    const token = await AsyncStorage.getItem("token");
    const totalCharge = await apiFactory()
      .data.device()
      .getTotalChargingData(chargerID, token, dates);
    setTotalCharge(totalCharge);
  };

  useEffect(() => {
    setIsLoading(true);
    getChargerInfo();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (date && charger) {
      const requestStartDate = moment(date).format("YYYY-MM-DD");
      const requestEndDate = moment(getEndMonthDate(date)).format("YYYY-MM-DD");
      getChargerTotalData(charger.id, { requestStartDate, requestEndDate });
    }
  }, [date, charger]);

  const getChargerInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const chargerData = await apiFactory()
      .data.device()
      .getChargerData(serialNumber, token);
    setCharger(chargerData);
    getChargerTotalData(chargerData.id);
  };

  const onSubmitDate = (date) => {
    setDate(date);
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      {!triggerRefresh && charger && !isLoading ? (
        <>
          <Layout customBackgroundUrl={DetailsBackground}>
            <Layout.Header>
              <HeaderNavigator navigation={navigation} route={route} />
            </Layout.Header>
            <Layout.Body>
              {!charger.isInCharge && (
                <View style={style.table_container}>
                  <PillButton
                    text={getFullMonthName(date)}
                    onPressAction={() => setIsCalendarOpen(true)}
                  />
                  <Table
                    chargerId={charger.id}
                    startDate={date}
                    endDate={getEndMonthDate(date)}
                    price={charger.price}
                  />
                </View>
              )}
            </Layout.Body>
            <Layout.Footer style={{ flex: 2, backgroundColor: "red" }}>
              {totalCharge && !charger.isInCharge ? (
                <DetailsCard
                  name={charger.name}
                  kwh={totalCharge.energyDelivered.toFixed(2)}
                  price={totalCharge.ammountSpent.toFixed(2)}
                  time={formatMs(totalCharge.chargeDuration)}
                  charger={charger}
                />
              ) : (
                // <Card
                //   isCharging={false}
                //   details={true}
                //   price={totalCharge.ammountSpent.toFixed(2)}
                //   kwh={totalCharge.energyDelivered.toFixed(2)}
                //   name={'Total'}
                //   hourMinutes={formatMs(totalCharge.chargeDuration)}
                // />
                <ChargerCard
                  name={charger.name}
                  kwh={kwhRenderer(charger.lastCharge[0])}
                  time={hourMinutesRenderer(charger.lastCharge[0])}
                  price={priceRenderer(
                    charger.lastCharge[0],
                    charger.price,
                    charger.currency
                  )}
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
                        serialNumber: serialNumber,
                      })
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ChargerButton
                    marginLeft={10}
                    isCharging={charger.isInCharge}
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
      ) : (
        <ActivityIndicator size={"large"} color={"#ffffff"}></ActivityIndicator>
      )}
    </>
  );
};

export default DeviceDetails;
