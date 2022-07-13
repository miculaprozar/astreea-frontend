import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import HeaderBackButton from "../../general_components/HeaderBackButton";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

import Layout from "../../general_components/Layout";
import { style } from "./ConnectQR.style";

const ConnectQR = (props) => {
  const { navigation } = props;

  const navigateToStep2 = () => {
    navigation.navigate("ConnectDevice");
  };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <View style={{ flex: 4, backgroundColor: "purple" }}></View>
      <View style={{ flex: 2 }}>
        <Text style={style.description}>
          Scan device QR code to register the device
        </Text>
        <Button text={"Scan QR"} marginTop={40} />
        <Button
          text={"Scan QR (no registered device)"}
          marginTop={20}
          onPressAction={navigateToStep2}
        />
      </View>
    </Layout>
  );
};

export default ConnectQR;
