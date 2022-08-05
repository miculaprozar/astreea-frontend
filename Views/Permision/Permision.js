import React, { useEffect } from "react";
import { Text, Image } from "react-native";
import Button from "../../components/Button/Button";
import { style } from "./Permision.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import routes from "../../routes";

import Layout from "../../general_components/Layout";

const Permision = () => {
  const navigation = useNavigation();

  const {
    SignIn: { name: SignInRoute },
  } = routes;

  const navigateToSignIn = () => navigation.navigate(SignInRoute);

  const storePermisionAndNavigate = async () => {
    try {
      await AsyncStorage.setItem("hasPermision", "Granted");
      navigateToSignIn();
    } catch (e) {
      console.log("THE TOKEN ERROR", e);
    }
  };

  const getHasPermision = async () => {
    const permision = await AsyncStorage.getItem("hasPermision");
    permision && navigateToSignIn();
  };

  useEffect(() => {
    getHasPermision();
  }, []);

  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout.Body></Layout.Body>
      <Layout.Footer>
        <Image
          style={style.image}
          source={require("../../assets/permisionInfo.png")}
        />
        <Text style={style.textDescription}>
          Get to know our privacy practices, how we collect and process data,
          and your choices about how information is used, in a format that is
          easy to read and navigate.
        </Text>
        <Text style={style.textNotes}>Read Privacy Notice</Text>
        <Button
          isSecondary={true}
          text={"CONTINUE"}
          marginBottom={60}
          onPressAction={() => storePermisionAndNavigate()}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default Permision;
