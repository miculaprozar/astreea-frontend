import { HubConnectionState } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import QRViewBackground from "../../assets/qrBackground.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

import { style } from "./Help.style";
const Help = ({ navigation, route }) => {
  return (
    <Layout scrollView={true} customBackgroundUrl={QRViewBackground}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
      </Layout.Header>
      <Layout.Body>
        <View style={style.card}>
          <Image
            style={style.image}
            source={require("../../assets/termsAndConditions.png")}
          />
          <Text style={style.privacyDescription}>
            Get to know our privacy practices, how we collect and process data,
            and your choices about how information is used, in a format that is
            easy to read and navigate.
          </Text>
          <Text style={style.privacyText}>Read Privacy Notice</Text>
        </View>
      </Layout.Body>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default Help;
