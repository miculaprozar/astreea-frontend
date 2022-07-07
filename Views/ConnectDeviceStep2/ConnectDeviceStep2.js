import React from "react";
import { Text, View } from "react-native";
import { style } from "./ConnectDeviceStep2Style";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";

const ConnectDeviceStep2 = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.navigate("ConnectDeviceStep1")}
        />
      ),
    });
  }, [navigation]);

  const navigateToSetup = () => {
    navigation.navigate("SetupDevice");
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
          <Text style={style.description}>
            Connect with your phone to the device hotspot
          </Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Button
            text={"Test connection"}
            marginTop={10}
            marginBottom={35}
            onPressAction={navigateToSetup}
          />
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default ConnectDeviceStep2;
