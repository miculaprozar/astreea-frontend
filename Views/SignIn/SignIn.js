import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { apiFactory } from "../../api/index.js";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout.js";
import { style } from "./SignIn.style";
import validationSchema from "./validationSchema";
import routes from "../../routes.js";

const SignIn = () => {
  const navigation = useNavigation();
  console.log("SignIn");

  const { Home, SignUp } = routes;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    navigation.navigate(Home.name);
    try {
      const login = await apiFactory().data.account().login(data);
    } catch (e) {
      console.log("the e is ", e.response.data.message);
    }

    console.log(data);
  };

  const navigateToSignUp = () => {
    navigation.navigate(SignUp.name);
  };

  return (
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
      </Layout.Footer>
    </Layout>
  );
};

export default SignIn;
