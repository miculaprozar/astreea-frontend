import React, { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { style } from "./SignUpStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import { useForm } from "react-hook-form";
import validationSchema from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiFactory } from "../../api/index.js";

const SignUp = () => {
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
      const login = await apiFactory()
        .data.account()
        .register({
          ...data,
          password: data.passwordControlled,
        });
      navigation.navigate("Home");
    } catch (e) {
      console.log("the e is ", e);
    }
  };

  const presed = () => {
    console.log("PRESED");
    navigation.navigate("ChargerSettings");
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
              label={"First name"}
              marginBottom={12}
              validateInput={true}
              control={control}
              errors={errors.firstName?.message}
              name={"firstName"}
              secureTextEntry={false}
            />
            <Input
              label={"Last name"}
              marginBottom={12}
              validateInput={true}
              control={control}
              errors={errors.lastName?.message}
              name={"lastName"}
              secureTextEntry={false}
            />
            <Input
              label={"Password"}
              marginBottom={12}
              validateInput={true}
              control={control}
              errors={errors.passwordControlled?.message}
              name={"passwordControlled"}
              secureTextEntry={true}
            />
            <Input
              label={"Confirm password"}
              marginBottom={20}
              validateInput={true}
              control={control}
              errors={errors.seccondPasswordControlled?.message}
              name={"seccondPasswordControlled"}
              secureTextEntry={true}
            />
            <Button
              text={"Sign Up"}
              marginBottom={10}
              title="Submit"
              onPressAction={presed}
            />
            <Text style={style.forgotText}>Forgot your password</Text>
          </View>
          <View>
            <Pressable onPress={presed}>
              <Text style={style.termsText}>
                By Continuing you agree to the Terms and Conditions
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default SignUp;
