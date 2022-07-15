import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import PillButton from "../../components/PillButton/PillButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import Layout from "../../general_components/Layout";
import routes from "../../routes";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFactory } from "../../api/index.js";

const Home = (props) => {
  const [token, setToken] = useState(null);

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

  const getUserChargers = async (token) => {
    try {
      const userChargers = await apiFactory()
        .data.account()
        .getUserCharger(token);
      console.log("THE USER CHARGERS ARE:", userChargers);
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
  const navigateToDevice = () => {
    navigation.navigate(DeviceDetails.name);
  };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideBack={true} />
      </Layout.Header>
      <Layout.Body>
        <SearchInput />
        <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <PillButton text={"All"} />
          </View>
          <View style={{ flex: 2 }}>
            <PillButton isSecondary text={"My chargers"} marginLeft={15} />
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
        <ScrollView>
          <Card isCharging={true} navigateToDevice={navigateToDevice} />
          <Card isCharging={false} navigateToDevice={navigateToDevice} />

          <Card isCharging={false} navigateToDevice={navigateToDevice} />
          <Card isCharging={true} navigateToDevice={navigateToDevice} />
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
