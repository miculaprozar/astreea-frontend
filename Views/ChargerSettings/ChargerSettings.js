import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import Input from "../../components/Input/Input";
import Label from "../../components/Input/Label";
import PillButton from "../../components/PillButton/PillButton";
import ChargerButton from "../../components/ChargerButton/ChargerButton";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { apiFactory } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { style } from "./ChargerSettings.style";
import Layout from "../../general_components/Layout";
import SnackBar from "../../general_components/SnackBar";

const ChargerSettings = ({ navigation, route }) => {
  const {
    params: { serialNumber },
  } = route;

  const [charger, setCharger] = useState(null);

  const [chargerName, setChargerName] = useState("");
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);
  const [inputError, setInputError] = useState(false);

  const getChargerInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const chargerData = await apiFactory()
      .data.device()
      .getChargerData(serialNumber, token);
    setCharger(chargerData);
    setChargerName(chargerData.name);
  };

  const updateChargerName = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await apiFactory()
        .data.device()
        .updateChargerData({ name: chargerName }, charger.id, token);
      setSucces(true);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const handleChargerNameChange = (event) => {
    event.length > 0 ? setInputError(false) : setInputError(true);
    setChargerName(event);
  };

  useEffect(() => {
    getChargerInfo();
  }, []);

  const removeDEMOCharger = async () => {
    const token = await getToken();
    await apiFactory().data.account().removeExistingChargerFromUser(token);
    navigation.navigate("Home");
  };
  return (
    <Layout scrollView={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
      </Layout.Header>
      <Layout.Body>
        <Label text={"Charger name"} white={true} />
        <Input
          marginBottom={25}
          placeholder={"Enter charger name"}
          value={chargerName}
          onChange={(event) => handleChargerNameChange(event)}
          errors={inputError ? "Name is required" : false}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={style.pillsLabel}>Curency</Text>
            <PillButton text={charger?.currency} isSecondary={true} />
          </View>
          <View style={{ flex: 1, marginBottom: 25 }}>
            <Text style={style.pillsLabel}>kWh Cost</Text>
            <PillButton text={charger?.price} isSecondary={true} />
          </View>
        </View>

        <Label text={"Wifi name"} white={true} />
        <Input marginBottom={10} disabled={true} value={charger?.WiFiName} />
        <Label text={"Wifi strength"} white={true} />
        <Input
          marginBottom={25}
          disabled={true}
          value={charger?.WiFiStrength.toString()}
        />
      </Layout.Body>
      <Layout.Footer>
        <View style={style.buttonsWrapper}>
          <View style={{ flex: 2 }}>
            <Button
              text={"Remove"}
              isDanger={true}
              onPressAction={() => {
                removeDEMOCharger();
              }}
              half={true}
            />
          </View>
          <View style={{ flex: 0.4 }}></View>
          <View style={{ flex: 2 }}>
            <Button
              disabled={inputError ? true : false}
              text={"Save settings"}
              isSecondary={true}
              half={true}
              onPressAction={() => updateChargerName()}
            />
          </View>
        </View>
        {(error || succes) && (
          <SnackBar
            text={error ? error : succes ? "Name changed" : ""}
            logSnackbar={error}
            setLogSnackbar={error ? setError : succes ? setSucces : null}
            logType={error ? "error" : "success"}
          />
        )}
      </Layout.Footer>
    </Layout>
  );
};

export default ChargerSettings;
