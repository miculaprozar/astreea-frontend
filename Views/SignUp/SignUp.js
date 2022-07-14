import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { apiFactory } from "../../api/index.js";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout";
import { style } from "./SignUp.style";
import validationSchema from "./validationSchema";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SnackBar from "../../general_components/SnackBar";

const SignUp = () => {
  const [error, setError] = useState(false);

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
      const register = await apiFactory()
        .data.account()
        .register({
          ...data,
          password: data.passwordControlled,
        });

      storeData(register);
      navigation.navigate("Home");
    } catch (e) {
      console.log("the e is ", e.response.data.message);
      setError(e.response.data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }, [error]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      console.log("THE TOKEN ERROR", e);
    }
  };

  const presed = () => {
    navigation.navigate("Home");
  };

  return (
    <Layout scrollView>
      <Layout.Header>
        <HeaderNavigator
          navigation={navigation}
          hideLogo={true}
          hideAccountSettings={true}
        />
      </Layout.Header>
      <Layout.Body>
        <>
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
            </View>
          </View>
        </>
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Sign Up"}
          marginBottom={10}
          title="Submit"
          onPressAction={handleSubmit(onSubmit)}
        />
        <Text style={style.forgotText}>Forgot your password</Text>
        <Pressable onPress={presed}>
          <Text style={style.termsText}>
            By Continuing you agree to the Terms and Conditions
          </Text>
        </Pressable>
        {error && <SnackBar text={error} />}
      </Layout.Footer>
    </Layout>
  );
};

export default SignUp;
