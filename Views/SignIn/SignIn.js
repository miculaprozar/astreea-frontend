import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { apiFactory } from "../../api/index.js";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout.js";
import { style } from "./SignIn.style";
import validationSchema from "./validationSchema";
import routes from "../../routes.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SnackBar from "../../general_components/SnackBar";

const SignIn = () => {
  const navigation = useNavigation();

  const [error, setError] = useState(false);

  const { Home, SignUp } = routes;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }, [error]);

  const onSubmit = async (data) => {
    try {
      const login = await apiFactory().data.account().login(data);
      storeData(login);
      navigation.navigate(Home.name);
      setError(false);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const storeData = async (value) => {
    try {
      const a = await AsyncStorage.setItem("token", value);
      console.log("WE ARE IN THE TRY", a);
    } catch (e) {
      console.log("THE TOKEN ERROR", e);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate(SignUp.name);
  };

  return (
    <>
      <Layout scrollView={true}>
        <Layout.Header>
          <Text style={style.title}>astreea</Text>
          <Text style={style.description}>
            The only electric charger you need
          </Text>
        </Layout.Header>

        <Layout.Body content="center">
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
        </Layout.Body>

        <Layout.Footer>
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
          <Text style={style.termsText}>
            By Continuing you agree to the Terms and Conditions
          </Text>
          {error && <SnackBar text={error} />}
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default SignIn;
