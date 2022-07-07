import React from "react";
import { Text, View } from "react-native";
import { style } from "./SignInStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";

const SignIn = () => {
  const navigation = useNavigation();
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <AvoidingKeyboardWrapper>
      <View style={style.wrapper}>
        <View style={style.textContainer}>
          <Text style={style.title}>astreea</Text>
          <Text style={style.description}>
            The only electric charger you need
          </Text>
        </View>
        <View style={style.inputButtonsContainer}>
          <View style={{ flex: 1 }}>
            <Input label={"Email"} marginBottom={15} />
            <Input label={"Password"} marginBottom={60} />
            <Button
              text={"Sign In"}
              marginBottom={10}
              onPressAction={navigateToHome}
            />
            <Text style={style.betweenButtonsText}>OR</Text>
            <Button
              isSecondary
              text={"Sign Up with Email"}
              marginTop={10}
              marginBottom={35}
              onPressAction={navigateToSignUp}
            />
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

export default SignIn;
