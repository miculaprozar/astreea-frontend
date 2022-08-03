import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import Button from "../../components/Button/Button";
import PillButton from "../../components/PillButton/PillButton";
import ChargerButton from "../../components/ChargerButton/ChargerButton";
import routes from "../../routes";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { apiFactory } from "../../api/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context } from "../../provider/Provider";
import Card from "../../components/Card/Card";
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import { format } from "date-fns";
import Table from "../../components/Table/Table";

import { style } from "./DeviceDetails.style";

import Layout from "../../general_components/Layout";
const DeviceDetails = (props) => {
  const { navigation } = props;
  const {
    route: {
      params: {
        chargerId,
        isCharging,
        name,
        hourMinutes,
        startStopData,
        price,
      },
    },
  } = props;

  console.log("THE PRICE IS:", price);

  const { ChargerSettings } = routes;
  const [token, setToken] = useState(null);
  const [totalCharge, setTotalCharge] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tableStartDate, setTableStartDate] = useState(null);
  const [tableEndDate, setTableEndDate] = useState(null);

  const [displayedDate, setDisplayedDate] = useState(moment());
  const [isCalendarOpen, SetIsCalendarOpen] = useState(false);

  const getData = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("token");
      setToken(tokenValue);
      if (tokenValue !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log("ERROR IN READING", e);
      // error reading value
    }
  };

  const StartStopCharging = async () => {
    try {
      const totalCharge = await apiFactory().data.device().startStopCharging(
        {
          chargerId: chargerId,
          voltage: 1,
          current: 1,
          power: 1,
          endKwh: 280,
        },
        token
      );
    } catch (e) {
      console.log("ERROR IN START STOP CHARGING", e.response.data);
    }
  };

  const getChargerTotalData = async (token, dates) => {
    try {
      const totalCharge = await apiFactory()
        .data.device()
        .getTotalChargingData(chargerId, token, dates);
      setTotalCharge(totalCharge);
    } catch (e) {
      console.log("the eeeee is ", e.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    token && getChargerTotalData(token);
  }, [token]);

  const navigateToChargerSettings = () => {
    navigation.navigate(ChargerSettings.name);
  };

  const setDates = (dates) => {
    if (dates.startDate) {
      setStartDate(dates.startDate);
      setTableStartDate(dates.startDate);
    }
    if (dates.endDate) {
      setEndDate(dates.endDate);
      setTableEndDate(dates.endDate);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const requestStartDate = moment(startDate).format("YYYY-MM-DD");
      const requestEndDate = moment(endDate).format("YYYY-MM-DD");
      getChargerTotalData(token, { requestStartDate, requestEndDate });

      setTimeout(() => {
        SetIsCalendarOpen(false);
        setStartDate(null);
        setEndDate(null);
      }, 1000);
    }
  }, [startDate, endDate]);

  const actualDate = moment(new Date()).format("YYYY-MM-DD");

  return (
    <>
      <DateRangePicker
        onChange={setDates}
        endDate={endDate}
        startDate={startDate}
        displayedDate={displayedDate}
        range
        open={isCalendarOpen}
        presetButtons={true}
      >
        <Text style={{ display: "none" }}></Text>
      </DateRangePicker>
      <Layout>
        <Layout.Header>
          <HeaderNavigator navigation={navigation} />
        </Layout.Header>
        <Layout.Body>
          <View style={style.tittleButtonWrapper}>
            <View style={{ flex: 1 }}>
              <Text style={style.title}> {name}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <PillButton
                text={"Settings"}
                isSecondary
                onPressAction={navigateToChargerSettings}
              />
            </View>
          </View>
          {!isCharging ? (
            <>
              <View style={{ ...style.tittleButtonWrapper, marginBottom: 10 }}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <PillButton
                    text={actualDate}
                    onPressAction={() => SetIsCalendarOpen(true)}
                  />
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}></View>
              </View>

              <Table
                token={token}
                chargerId={chargerId}
                tableStartDate={tableStartDate}
                tableEndDate={tableEndDate}
                setTableEndDate={setTableEndDate}
                setTableStartDate={setTableStartDate}
                price={price}
              />
            </>
          ) : (
            <View>
              <Text style={style.chargingTitle}>Charging</Text>
              <MaterialCommunityIcons
                name="battery-medium"
                size={350}
                color="green"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 30,
                }}
              />
            </View>
          )}
        </Layout.Body>
        <Layout.Footer style={{ flex: 2, backgroundColor: "red" }}>
          {totalCharge && (
            <Card
              isCharging={false}
              details={true}
              price={totalCharge.ammountSpent}
              kwh={totalCharge.energyDelivered}
              name={isCharging ? "Charging" : "Total"}
              hourMinutes={hourMinutes}
            />
          )}
          <View style={style.tittleButtonWrapper}>
            <View style={{ flex: 1 }}>
              <ChargerButton
                text={"Schedule"}
                marginRight={10}
                isSecondary={true}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ChargerButton
                text={isCharging ? "Stop" : "Start"}
                marginLeft={10}
                isDanger={isCharging}
                onPressAction={() => StartStopCharging()}
              />
            </View>
          </View>
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default DeviceDetails;
