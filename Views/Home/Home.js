import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import PillButton from "../../components/PillButton/PillButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import Layout from "../../general_components/Layout";
import routes from "../../routes";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFactory } from "../../api/index.js";

import { Context } from "../../provider/Provider";

const Home = (props) => {
  const { boolean, setChargers2 } = useContext(Context);

  // useEffect(() => {
  //   console.log("THE CONTEXT IS:", boolean);
  // }, [boolean]);

  const [token, setToken] = useState(null);
  const [chargers, setChargers] = useState(null);

  const [myChargers, setMychargers] = useState(null);

  const [searchfield, setSearchfield] = useState("");

  const { navigation } = props;

  const { ConnectQR, DeviceDetails, Account, SignIn } = routes;

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

  const filteredChargers =
    chargers &&
    chargers.filter((charger) => {
      return charger.name.toLowerCase().includes(searchfield.toLowerCase());
    });

  const adminChargers =
    myChargers &&
    filteredChargers.filter((charger) => {
      return charger.isAdmin === myChargers;
    });

  const getUserChargers = async (token) => {
    try {
      const userChargers = await apiFactory()
        .data.account()
        .getUserCharger(token);

      // console.log("THE CHARGERS ARE:", userChargers);
      setChargers(userChargers);
    } catch (e) {
      console.log("the eeeee is ", e.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    token && getUserChargers(token);
  }, [token]);

  const navigateToAddDevice = () => {
    navigation.navigate(ConnectQR.name);
  };
  // const navigateToDevice = (id) => {
  //   navigation.navigate(DeviceDetails.name);
  // };

  const kwhRenderer = (lastCharge) => {
    // console.log("THE LAST CHARGE DATA IS:", lastCharge);
    return lastCharge.length === 0 || lastCharge[0].endKwh === null
      ? "-- kWh"
      : lastCharge[0].endKwh - lastCharge[0].startKwh + " kWh";
  };

  const priceRenderer = (lastCharge, price, curency) =>
    lastCharge.length === 0 || lastCharge[0].endKwh === null
      ? "-- "
      : price * (lastCharge[0].endKwh - lastCharge[0].startKwh) + " " + curency;

  const hourMinutesRenderer = (lastCharge) =>
    lastCharge.length === 0 || lastCharge[0].endKwh === null
      ? "-- hh:mm "
      : "3h 34m";

  const isCharging = (lastCharge) =>
    lastCharge.length > 0 && lastCharge[0].endKwh === null ? true : false;

  const startStopData = (lastCharge) =>
    lastCharge.length === 0
      ? null
      : {
          startKwh: lastCharge[0].startKwh,
          endKwh: lastCharge[0].endKwh,
          voltage: lastCharge[0].voltage,
          current: lastCharge[0].current,
          power: lastCharge[0].power,
        };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideBack={true} />
      </Layout.Header>
      <Layout.Body>
        <SearchInput setSearchfield={setSearchfield} />
        <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <PillButton
              isSecondary={myChargers && true}
              text={"All"}
              onPressAction={() => setMychargers(null)}
            />
          </View>
          <View style={{ flex: 2 }}>
            <PillButton
              isSecondary={!myChargers && true}
              text={"My chargers"}
              marginLeft={15}
              onPressAction={() => setMychargers(1)}
            />
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
        <ScrollView>
          {chargers && adminChargers
            ? adminChargers.map((item) => (
                <Card
                  isCharging={isCharging(item.lastCharge)}
                  lastCharge={item.lastCharge}
                  kwh={kwhRenderer(item.lastCharge)}
                  price={priceRenderer(
                    item.lastCharge,
                    item.price,
                    item.currency
                  )}
                  key={
                    item.lastCharge.length > 0 ? item.lastCharge[0].id : item.id
                  }
                  name={item.name}
                  currency={item.currency}
                  id={item.id}
                  hourMinutes={hourMinutesRenderer(item.lastCharge)}
                  startStopData={startStopData(item.lastCharge)}
                />
              ))
            : chargers &&
              filteredChargers.map((item) => (
                <Card
                  isCharging={isCharging(item.lastCharge)}
                  lastCharge={item.lastCharge}
                  kwh={kwhRenderer(item.lastCharge)}
                  key={
                    item.lastCharge.length > 0 ? item.lastCharge[0].id : item.id
                  }
                  name={item.name}
                  currency={item.currency}
                  price={priceRenderer(
                    item.lastCharge,
                    item.price,
                    item.currency
                  )}
                  id={item.id}
                  hourMinutes={hourMinutesRenderer(item.lastCharge)}
                  startStopData={startStopData(item.lastCharge)}
                />
              ))}
        </ScrollView>
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Add new charger"}
          marginTop={10}
          onPressAction={navigateToAddDevice}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
