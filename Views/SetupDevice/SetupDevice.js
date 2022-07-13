import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { style } from "./SetupDevice.style";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

import routes from "../../routes";

import Layout from "../../general_components/Layout";

const SetupDevice = (props) => {
  const { navigation } = props;

  const { ConnectDevice } = routes;

  return (
    <Layout scrollView={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>Set up your device</Text>
        <Input label={"Email"} marginBottom={15} marginTop={15} />
        <Input label={"Email"} marginBottom={15} />
        <Text style={style.description}>Wifi settings</Text>
        <Input label={""} marginBottom={0} marginTop={-10} />
        <Input label={""} marginBottom={15} />
      </Layout.Body>
      <Layout.Footer>
        <Button text={"Verify set-up"} marginTop={10} marginBottom={35} />
      </Layout.Footer>
    </Layout>
  );
};

export default SetupDevice;
