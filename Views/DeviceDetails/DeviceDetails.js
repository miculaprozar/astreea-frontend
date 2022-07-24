import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
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

import { style } from "./DeviceDetails.style";

import Layout from "../../general_components/Layout";
const DeviceDetails = (props) => {
  const { navigation } = props;
  const {
    route: {
      params: { chargerId, isCharging, name, hourMinutes, startStopData },
    },
  } = props;
  const { chargers2, setBoolean } = useContext(Context);

  const { ChargerSettings } = routes;
  const [token, setToken] = useState(null);
  const [totalCharge, setTotalCharge] = useState(null);
  const [page, setPage] = useState(1);
  const [chargerHistory, setChargerHistory] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
      console.log("THE TOTAL CHARGE IS:", totalCharge);
    } catch (e) {
      console.log("ERROR IN START STOP CHARGING", e.response.data);
    }
  };

  const getChargerTotalData = async (token) => {
    try {
      const totalCharge = await apiFactory()
        .data.device()
        .getTotalChargingData(chargerId, token);
      setTotalCharge(totalCharge);
    } catch (e) {
      console.log("the eeeee is ", e.response.data.message);
    }
  };

  const getChargerHistory = async (token) => {
    try {
      const { data: theChargerHistory } = await apiFactory()
        .data.device()
        .chargerHistory(chargerId, page, 4, token);

      setChargerHistory([...chargerHistory, ...theChargerHistory]);
    } catch (e) {
      console.log("the eeeee is ", e);
    }
  };

  // useEffect(() => {
  //   console.log("the carger history is:", chargerHistory);
  // }, [chargerHistory]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("THE PAGE IS:", page, chargerHistory);
  }, [page, chargerHistory]);

  useEffect(() => {
    token && getChargerTotalData(token);
  }, [token]);

  useEffect(() => {
    token && getChargerHistory(token);
  }, [token, page]);

  const navigateToChargerSettings = () => {
    navigation.navigate(ChargerSettings.name);
  };
  //   const navigateToSignUp = () => {
  //     navigation.navigate("SignUp");
  //   };
  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  const setDates = (dates) => {
    dates.startDate && setStartDate(dates.startDate);
    dates.endDate && setEndDate(dates.endDate);
  };

  useEffect(() => {
    console.log("THE DATES ARE:", startDate, endDate);
    if (startDate && endDate) {
      setTimeout(() => {
        SetIsCalendarOpen(false);
        setStartDate(null);
        setEndDate(null);
      }, 1000);
    }
  }, [startDate, endDate]);

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
              <View style={style.tittleButtonWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <PillButton
                    text={"February"}
                    onPressAction={() => SetIsCalendarOpen(true)}
                  />
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}></View>
              </View>
              <View style={style.tableWrapper}>
                <View style={{ flex: 1 }}>
                  <Text>Date</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Time</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Grid</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Cost</Text>
                </View>
              </View>
              <FlatList
                data={chargerHistory}
                renderItem={({ item }) => {
                  return (
                    // <View style={style.tableWrapper}>
                    //   <View style={{ flex: 1 }}>
                    //     <Text>{item?.id}</Text>
                    //   </View>
                    //   <View style={{ flex: 1 }}>
                    //     <Text>Time</Text>
                    //   </View>
                    //   <View style={{ flex: 1 }}>
                    //     <Text>Grid</Text>
                    //   </View>
                    //   <View style={{ flex: 1 }}>
                    //     <Text>Cost</Text>
                    //   </View>
                    // </View>
                    <View
                      style={{
                        marginBottom: 10,
                        backgroundColor: "red",
                        marginBottom: 45,
                      }}
                    >
                      <Text>{item.id}</Text>
                    </View>
                  );
                }}
                onEndReached={() => setPage(page + 1)}
                keyExtractor={(item) => item.id}
                onEndReachedThreshold={0.5}
                // extraData={page}
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
