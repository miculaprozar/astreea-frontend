import React from "react";
import { Image, Text } from "react-native";
import Button from "../../components/Button/Button";
import LogoBar from "../../components/LogoBar/LogoBar";
import routes from "../../routes";
import { style } from "./TermsAndConditions.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Layout from "../../general_components/Layout";

const TermsAndConditions = (props) => {
  const { navigation } = props;
  const { QRScannerStep } = routes;

  const setTermsAccepted = async () => {
    try {
      await AsyncStorage.setItem("termsAndCond", "accepted");
    } catch (e) {
      console.log("THE ERROR", e);
    }
  };

  const navigateToQrScanner = () => {
    setTermsAccepted();
    navigation.navigate(QRScannerStep.name);
  };

  return (
    <Layout scrollView={true}>
      <Layout.Header></Layout.Header>
      <Layout.Body>
        <Image
          style={style.logoimage}
          source={require("../../assets/charger.png")}
        />
      </Layout.Body>
      <Layout.Footer>
        <Image
          style={style.image}
          source={require("../../assets/termsAndConditions.png")}
        />
        <Text style={style.text}>
          Get to know our privacy practices, how we collect and process data,
          and your choices about how information is used, in a format that is
          easy to read and navigate.
        </Text>
        <Text style={style.privacyText}>Read Privacy Notice</Text>
        <Button
          text={"Continue"}
          isSecondary={true}
          marginTop={15}
          marginBottom={30}
          onPressAction={navigateToQrScanner}
        />
      </Layout.Footer>
      <LogoBar />
    </Layout>
  );
};

export default TermsAndConditions;
