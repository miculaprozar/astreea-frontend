import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { style } from "./SignInStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import { apiFactory } from "../../api/index.js";
import { useForm } from "react-hook-form";
import validationSchema from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const login = await apiFactory().data.account().login(data);
      navigation.navigate("Home");
    } catch (e) {
      console.log("the e is ", e.response.data.message);
    }

    console.log(data);
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
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
            <Input
              label={"Email"}
              marginBottom={15}
              validateInput={true}
              control={control}
              errors={errors.email?.message}
              name={"email"}
              secureTextEntry={false}
            />
            <Input
              label={"Password"}
              marginBottom={60}
              validateInput={true}
              control={control}
              errors={errors.password?.message}
              name={"password"}
              secureTextEntry={true}
            />
            <Button
              text={"Sign In"}
              marginBottom={10}
              onPressAction={handleSubmit(onSubmit)}
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
