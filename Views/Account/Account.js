import React from "react";
import { Text, View } from "react-native";
import { style } from "./AccountStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";

const Account = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("SignIn")} />
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
          <Text style={style.title}>My account</Text>
        </View>
        <View style={{ flex: 10 }}>
          <Input label={"Email"} marginBottom={15} marginTop={15} />
          <Input label={"Email"} marginBottom={15} />
          <Input label={"Email"} marginBottom={15} />
          <Input label={"Email"} marginBottom={15} />
        </View>
        <View style={{ flex: 0.5 }}>
          <Button
            isSecondary
            text={"Log out"}
            marginTop={10}
            marginBottom={15}
            onPressAction={navigateToSignIn}
          />
          <Button text={"Save settings"} marginTop={10} marginBottom={35} />
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default Account;
