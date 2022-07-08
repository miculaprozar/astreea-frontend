import React from "react";
import { Text, View } from "react-native";
import { style } from "./AccountStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";
import { useForm } from "react-hook-form";
import validationSchema from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiFactory } from "../../api/index.js";

const Account = (props) => {
  const { navigation } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("SignIn")} />
      ),
    });
  }, [navigation]);

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };
  // const onSubmit = async (data) => {
  //   try {
  //     const login = await apiFactory()
  //       .data.account()
  //       .register({
  //         ...data,
  //         password: data.passwordControlled,
  //       });
  //     console.log("THE LOGIN DATA:", login);
  //     navigation.navigate("Home");
  //   } catch (e) {
  //     console.log("the e is ", e);
  //   }
  // };

  const onSubmit = (data) => console.log(data);

  return (
    <AvoidingKeyboardWrapper>
      <View style={style.wrapper}>
        <View style={{ flex: 0.5 }}>
          <Text style={style.title}>My account</Text>
        </View>
        <View style={{ flex: 10 }}>
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
        <View style={{ flex: 0.5 }}>
          <Button
            isSecondary
            text={"Log out"}
            marginTop={10}
            marginBottom={15}
            onPressAction={navigateToSignIn}
          />
          <Button
            text={"Save settings"}
            marginTop={10}
            marginBottom={35}
            onPressAction={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default Account;
