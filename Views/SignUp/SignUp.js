import React from "react";
import { Text, View } from "react-native";
import { style } from "./SignUpStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";

const SignUp = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <AvoidingKeyboardWrapper>
      <View style={style.wrapper}>
        <View style={style.textContainer}>
          <Text style={style.greetings}>Welcome to</Text>
          <Text style={style.title}>astreea</Text>
        </View>
        <View style={style.inputButtonsContainer}>
          <View style={{ flex: 1 }}>
            <Input label={"Email"} marginBottom={15} />
            <Input label={"First name"} marginBottom={15} />
            <Input label={"Last name"} marginBottom={15} />
            <Input label={"Password"} marginBottom={30} />
            <Button
              text={"Sign Up"}
              marginBottom={10}
              onPressAction={navigateToHome}
            />
            <Text style={style.forgotText}>Forgot your password</Text>
          </View>
          <View>
            <Text style={style.termsText}>
              By Continuing you agree to the Terms and Conditions
            </Text>
          </View>
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default SignUp;
