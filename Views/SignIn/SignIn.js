import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, Pressable, Image, View } from "react-native";
import { apiFactory } from "../../api/index.js";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout.js";
import { style } from "./SignIn.style";
import validationSchema from "./validationSchema";
import routes from "../../routes.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SnackBar from "../../general_components/SnackBar";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

const SignIn = (props) => {
  const {
    Home,
    SignUp: { name: signUpRoute },
    ForgotPassword: { name: forgotPasswordRoute },
  } = routes;
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      setIsLoading(true);
      const token = await apiFactory().data.account().login(data);
      await AsyncStorage.setItem("token", token);
      const userData = await apiFactory().data.account().getSpecificUser(token);
      if (userData?.firstName && userData?.lastName) {
        await AsyncStorage.setItem("firstName", userData.firstName);
        await AsyncStorage.setItem("lastName", userData.lastName);
        await AsyncStorage.setItem("email", email);
      }
      navigation.navigate(Home.name);
      setError(false);
      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate(signUpRoute);
  };
  const navigateToForgotPassword = () => {
    navigation.navigate(forgotPasswordRoute);
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate(Home.name);
      }
      isUserLoggedIn().catch((e) =>
        console.log("Error in getting already logged user token", e)
      );
    };
  }, []);

  return (
    <>
      <Layout scrollView={true}>
        <Layout.Header>
          <HeaderNavigator navigation={navigation} route={props.route} />
        </Layout.Header>

        <Layout.Body content="center">
          <Image
            style={style.image}
            source={require("../../assets/charger.png")}
          />
          <Input
            label={"Email"}
            marginBottom={25}
            validateInput={true}
            control={control}
            errors={errors.email?.message}
            name={"email"}
            secureTextEntry={false}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
          <Input
            label={"Password"}
            marginBottom={15}
            validateInput={true}
            control={control}
            errors={errors.password?.message}
            name={"password"}
            secureTextEntry={true}
          />
          <Button
            text={"SIGN IN"}
            marginTop={20}
            marginBottom={15}
            onPressAction={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
            fill={true}
          />
          <View style={style.textWrapper}>
            <Pressable onPress={() => navigateToSignUp()}>
              <Text style={style.forgotPasswordText}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={() => navigateToForgotPassword()}>
              <Text style={style.forgotPasswordText}>Forgot Password</Text>
            </Pressable>
          </View>
          <View style={style.lineAndTextWrapper}>
            <View style={style.line}></View>
            <View style={{ flex: 1 }}>
              <Text style={style.betweenLinesText}>OR</Text>
            </View>
            <View style={style.line}></View>
          </View>
        </Layout.Body>

        <Layout.Footer>
          {error && (
            <SnackBar
              text={error}
              logSnackbar={error}
              setLogSnackbar={setError}
              logType="error"
            />
          )}
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default SignIn;
