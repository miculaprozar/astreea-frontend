import React, { useEffect } from "react";
import { Text, Image, View } from "react-native";
import Button from "../../components/Button/Button";
import { style } from "./StartPairing.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import routes from "../../routes";
import DetailsBackground from "../../assets/qrBackground.jpg";

import Layout from "../../general_components/Layout";

const StartPairing = (props) => {
  const { navigation } = props;

  const { Home, StartPairing } = routes;

  const navigateToHome = () => {
    navigation.navigate(Home.name);
  };

  return (
    <Layout customBackgroundUrl={DetailsBackground}>
      <Layout.Header>
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
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>The only electric charger you need</Text>
      </Layout.Body>
      <Layout.Footer>
        <Button
          isSecondary={true}
          text={"START PAIRING"}
          marginBottom={60}
          onPressAction={() => navigateToHome()}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default StartPairing;
