import React from "react";
import { Text, View } from "react-native";
import Input from "../../components/Input/Input";
import PillButton from "../../components/PillButton/PillButton";
import ChargerButton from "../../components/ChargerButton/ChargerButton";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

import { style } from "./ChargerSettings.style";
import Layout from "../../general_components/Layout";

const ChargerSettings = ({ navigation }) => {
  return (
    <Layout scrollView={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} />
      </Layout.Header>
      <Layout.Body>
        <Input label={"Charger name"} marginBottom={15} marginTop={15} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <Text style={style.pillsLabel}>Curency</Text>
            <PillButton text={"USD"} />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <Text style={style.pillsLabel}>kWh Cost</Text>
            <PillButton text={"0.2"} isSecondary={true} />
          </View>
        </View>
        <Text style={style.inputLabel}>Wifi settings</Text>
        <Input label={""} marginBottom={0} marginTop={-10} />
        <Input label={""} marginBottom={35} />
        <Card isCharging={false} details={true} />
      </Layout.Body>
      <Layout.Footer>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <ChargerButton text={"Share"} marginRight={10} isShare={true} />
          </View>
          <View style={{ flex: 1 }}>
            <ChargerButton text={"Stop"} marginLeft={10} isDanger={true} />
          </View>
        </View>
        <Button text={"Save settings"} marginTop={25} marginBottom={35} />
      </Layout.Footer>
    </Layout>
  );
};

export default ChargerSettings;
