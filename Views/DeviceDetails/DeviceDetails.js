import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import PillButton from "../../components/PillButton/PillButton";
import ChargerButton from "../../components/ChargerButton/ChargerButton";
import routes from "../../routes";

import Card from "../../components/Card/Card";

import { style } from "./DeviceDetails.style";

import Layout from "../../general_components/Layout";
const DeviceDetails = (props) => {
  const { navigation } = props;

  const { ChargerSettings } = routes;

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
        <View style={style.tittleButtonWrapper}>
          <View style={{ flex: 1 }}>
            <Text style={style.title}>Home</Text>
          </View>
          <View style={{ flex: 1 }}>
            <PillButton
              text={"Settings"}
              isSecondary
              onPressAction={navigateToChargerSettings}
            />
          </View>
        </View>
      </Layout.Header>
      <Layout.Body>
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
      </Layout.Body>
      <Layout.Footer style={{ flex: 2, backgroundColor: "red" }}>
        <Card isCharging={false} details={true} />
        <View style={style.tittleButtonWrapper}>
          <View style={{ flex: 1 }}>
            <ChargerButton
              text={"Schedule"}
              marginRight={10}
              isSecondary={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ChargerButton text={"Start"} marginLeft={10} />
          </View>
        </View>
      </Layout.Footer>
    </Layout>
  );
};

export default DeviceDetails;
