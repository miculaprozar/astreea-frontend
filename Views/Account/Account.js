import React, { useContext } from "react";
import { Image, Text } from "react-native";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";
import Button from "../../components/Button/Button";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import { style } from "./Account.style";

const Account = (props) => {
  const { initLogOut, initEditProfile, initResetPassword, userName } =
    useContext(AuthContext);

  const { navigation, route } = props;

  const triggerLogOutFlow = async () => {
    initLogOut();
  };

  const handleEditProfile = () => {
    initEditProfile();
  };

  const handleResetPassword = () => {
    initResetPassword();
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
        <Image
          style={style.image}
          source={require("../../assets/myAccount.png")}
        />
        <Text style={style.changeText}>My Account</Text>
        <Text style={style.title}>{userName}</Text>

        <Button
          text={"Edit profile"}
          marginBottom={20}
          onPressAction={handleEditProfile}
          fill={true}
        />
        <Button
          text={"Reset Password"}
          marginBottom={20}
          onPressAction={handleResetPassword}
          fill={true}
        />
        <Button
          isSecondary
          text={"LOG OUT"}
          marginBottom={15}
          marginTop={30}
          onPressAction={triggerLogOutFlow}
          fill={true}
        />
      </Layout.Body>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default Account;
