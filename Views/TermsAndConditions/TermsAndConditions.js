import React, { useEffect, useState, useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { style } from "./TermsAndConditions.style";
import Button from "../../components/Button/Button";
import routes from "../../routes";

import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";

const TermsAndConditions = (props) => {
  const { navigation, route } = props;
  const { Home, StartPairing } = routes;

  const navigateToHome = () => {
    navigation.navigate(StartPairing.name);
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
        <Text style={style.privayText}>Read Privacy Notice</Text>
        <Button
          text={"Continue"}
          isSecondary={true}
          marginTop={15}
          marginBottom={30}
          onPressAction={navigateToHome}
        />
      </Layout.Footer>
      <View style={style.footerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={style.leftTextFooter}>Build for a lifetime.</Text>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Image
            style={style.titleWhite}
            source={require("../../assets/titleWhite.png")}
          />
        </View>
      </View>
    </Layout>
  );
};

export default TermsAndConditions;
