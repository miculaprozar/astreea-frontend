import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import Layout from "../../general_components/Layout.js";
import { style } from "./ForgotPassword.style";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { apiFactory } from "../../api/index.js";
import validationSchema from "./validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SnackBar from "../../general_components/SnackBar";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const forgotPassword = await apiFactory()
        .data.account()
        .forgotPassword(data);

      console.log("THE FORGOT PASSWORD IS", forgotPassword);

      setSucces(true);
      setError(false);
    } catch (e) {
      console.log("WE ARE IN CATCH", e.response.data);
      setSucces(false);
      setError(true);
    }
  };

  useEffect(() => {
    succes &&
      setTimeout(() => {
        navigation.navigate("SignIn");
      }, 5000);
  }, [succes]);

  return (
    <>
      <Layout scrollView={true}>
        <Layout.Header>
          <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
          <Text style={style.title}>
            Enter your email to reset your password
          </Text>
          <Input
            label={"Email"}
            name={"email"}
            marginBottom={30}
            validateInput={true}
            control={control}
            errors={errors.email?.message}
          />
        </Layout.Header>

        <Layout.Body content="center"></Layout.Body>

        <Layout.Footer>
          <Button
            text={"Reset password"}
            marginBottom={10}
            onPressAction={handleSubmit(onSubmit)}
          />
          {(error || succes) && (
            <SnackBar
              text={
                error ? "Wrong email" : succes ? "Email trimis cu succes" : ""
              }
              logSnackbar={error}
              setLogSnackbar={error ? setError : succes ? setSucces : null}
              logType={error ? "error" : "success"}
            />
          )}
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default ForgotPassword;
