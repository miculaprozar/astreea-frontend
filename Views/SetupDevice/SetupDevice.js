import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { style } from "./SetupDevice.style";
import HeaderBackButton from "../../general_components/HeaderBackButton";
import routes from "../../routes";

import Layout from "../../general_components/Layout";

const SetupDevice = (props) => {
  const { navigation } = props;

  const { ConnectDevice } = routes;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.navigate(ConnectDevice.name)}
        />
      ),
    });
  }, [navigation]);

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <Text style={style.title}>Connect to Device</Text>
      </View>
      <View style={{ flex: 10 }}>
        <Input label={"Email"} marginBottom={15} marginTop={15} />
        <Input label={"Email"} marginBottom={15} />
        <Text style={style.description}>Wifi settings</Text>
        <Input label={""} marginBottom={0} marginTop={-10} />
        <Input label={""} marginBottom={15} />
      </View>
      <View style={{ flex: 2 }}>
        <Button text={"Verify set-up"} marginTop={10} marginBottom={35} />
      </View>
    </Layout>
  );
};

export default SetupDevice;
