import React from "react";
import { Text, View } from "react-native";
import { style } from "./SetupDeviceStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";

const SetupDevice = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.navigate("ConnectDeviceStep2")}
        />
      ),
    });
  }, [navigation]);

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <AvoidingKeyboardWrapper>
      <View style={style.wrapper}>
        <View style={{ flex: 0.5 }}>
          <Text style={style.title}>Connect to Device</Text>
        </View>
        <View style={{ flex: 10 }}>
          <Input label={"Email"} marginBottom={15} marginTop={15} />
          <Input label={"Email"} marginBottom={15} />
          <Text style={style.description}>Wifi settings</Text>
          <Input label={""} marginBottom={0} marginTop={-10} />
          <Input label={""} marginBottom={15} />
        </View>
        <View style={{ flex: 0.5 }}>
          <Button text={"Verify set-up"} marginTop={10} marginBottom={35} />
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default SetupDevice;
