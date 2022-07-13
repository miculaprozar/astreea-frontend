import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout";
import { style } from "./ConnectDevice.style";
import routes from "../../routes";

const ConnectDevice = (props) => {
  const { navigation } = props;

  const { ConnectQR, SetupDevice } = routes;

  const navigateToSetup = () => {
    navigation.navigate(SetupDevice.name);
  };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>Connect to Device</Text>
        <Input
          label={"Hotspot name"}
          marginBottom={15}
          marginTop={15}
          disabled
        />
        <Input disabled label={"Password"} marginBottom={15} />
        <Text style={style.description}>
          Connect with your phone to the device hotspot
        </Text>
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Test connection"}
          marginTop={10}
          marginBottom={35}
          onPressAction={navigateToSetup}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default ConnectDevice;
