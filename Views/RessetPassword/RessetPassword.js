import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout";
import { style } from "./RessetPassword.style";
import validationSchema from "./validationSchema";
import routes from "../../routes";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFactory } from "../../api/index.js";
import SnackBar from "../../general_components/SnackBar";

const RessetPassword = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const { navigation, route } = props;

  const { Home } = routes;

  console.log("SIGN IN", Home.name);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("token");
      setToken(tokenValue);
      if (tokenValue !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log("ERROR IN READING", e);
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      console.log("THE TOKEN ERROR", e);
    }
  };

  const getUserDetails = async () => {
    try {
      const { id: userId } = await apiFactory()
        .data.account()
        .getSpecificUser(token);

      setUserId(userId);
    } catch (e) {
      console.log("the e is ", e.response.data.message);
    }
  };

  const redirect = () => {
    setTimeout(() => {
      navigation.navigate(Home.name);
    }, 5000);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    token && getUserDetails();
  }, [token]);

  const onSubmit = async ({ password, newPassword }) => {
    console.log("THE DATA IS:", password, newPassword);
    try {
      const newToken = await apiFactory()
        .data.account()
        .updateUser(token, { id: userId, password, newPassword });
      setSucces(true);
      storeData(newToken);
      redirect();
    } catch (e) {
      console.log("the e is ", e.response.data.message);
      setError(e.response.data.message);
    }
  };

  return (
    <Layout scrollView={true}>
      <Layout.Header>
        <HeaderNavigator
          navigation={navigation}
          hideAccountSettings={true}
          route={route}
        />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>Change your password</Text>
        <Input
          label={"Curent passowrd"}
          marginBottom={25}
          validateInput={true}
          control={control}
          errors={errors.password?.message}
          name={"password"}
          secureTextEntry={true}
        />
        <Input
          label={"New password"}
          marginBottom={25}
          validateInput={true}
          control={control}
          errors={errors.newPassword?.message}
          name={"newPassword"}
          secureTextEntry={true}
        />
        <Input
          label={"Confirm new password"}
          validateInput={true}
          control={control}
          errors={errors.confirmNewPassword?.message}
          name={"confirmNewPassword"}
          secureTextEntry={true}
        />
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Change password"}
          marginBottom={35}
          onPressAction={handleSubmit(onSubmit)}
          fill={true}
        />
        {(error || succes) && (
          <SnackBar
            text={error ? error : succes ? "Password changed" : ""}
            logSnackbar={error}
            setLogSnackbar={error ? setError : succes ? setSucces : null}
            logType={error ? "error" : "success"}
          />
        )}
      </Layout.Footer>
    </Layout>
  );
};

export default RessetPassword;
