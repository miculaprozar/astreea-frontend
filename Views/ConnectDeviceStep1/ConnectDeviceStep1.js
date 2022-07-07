import React from "react";
import { Text, View } from "react-native";
import { style } from "./ConnectDeviceStep1Style";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";

const ConnectDeviceStep1 = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      ),
    });
  }, [navigation]);

  const navigateToStep2 = () => {
    navigation.navigate("ConnectDeviceStep2");
  };

  return (
    <View style={style.wrapper}>
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
    </View>
  );
};

export default ConnectDeviceStep1;
