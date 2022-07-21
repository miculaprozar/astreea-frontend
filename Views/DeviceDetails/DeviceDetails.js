import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
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

import { style } from "./DeviceDetails.style";

import Layout from "../../general_components/Layout";
const DeviceDetails = (props) => {
  const { navigation } = props;
  const {
    route: {
      params: { chargerId, isCharging, name, hourMinutes, startStopData },
    },
  } = props;
  const { setBoolean } = useContext(Context);

  console.log("THE SET FUNCTUON IS:", startStopData);

  const { ChargerSettings } = routes;
  const [token, setToken] = useState(null);
  const [totalCharge, setTotalCharge] = useState(null);

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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    token && getChargerTotalData(token);
  }, [token]);

  const navigateToChargerSettings = () => {
    navigation.navigate(ChargerSettings.name);
  };
  //   const navigateToSignUp = () => {
  //     navigation.navigate("SignUp");
  //   };
  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  return (
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
              <View style={{ flex: 1 }}>
                <PillButton text={"February"} />
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
            <Text>Body</Text>
          </>
        ) : (
          <View>
            <Text style={style.chargingTitle}>Charging</Text>
            <MaterialCommunityIcons
              name="battery-medium"
              size={350}
              color="green"
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30 }}
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
              onPressAction={() => setBoolean((prevState) => !prevState)}
            />
          </View>
        </View>
      </Layout.Footer>
    </Layout>
  );
};

export default DeviceDetails;
