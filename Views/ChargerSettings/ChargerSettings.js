import { yupResolver } from "@hookform/resolvers/yup";
import { HubConnectionState } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";

import ChargerSettingsBackground from "../../assets/chargingScreen.jpg";
import ChargerSettingsCard from "../../components/ChargerSettingsCard/ChargerSettingsCard";
import ColorButtons from "../../components/ColorButtons/ColorButtons";
import ColorPickerModal from "../../components/ColorPickerModal/ColorPickerModal";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import SnackBar from "../../general_components/SnackBar";
import validationSchema from "./validationSchema";

const ChargerSettings = ({ navigation, route }) => {
  const {
    params: { chargerId, serialNumberCon },
  } = route;

  const connection = global.connection;
  const cert = global.cert;

  const [charger, setCharger] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const setInputValues = (charger) => {
    const { address, name, price, currency } = charger;

    setTimeout(() => {
      setValue("name", name);
      setValue("address", address);
      setValue("price", price.toString());
      setValue("currency", currency);
    });
  };

  const getChargerInfo = async () => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke("GetChargerDetails", serialNumberCon)
        .then((charger) => {
          setCharger(charger);
          setInputValues(charger);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  useEffect(() => {
    getChargerInfo();
  }, [connection]);

  return (
    <Layout scrollView={true} customBackgroundUrl={ChargerSettingsBackground}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
      </Layout.Header>
      <Layout.Body>
        <View>
          <Text
            style={{
              marginBottom: 20,
              color: "#FFFFFF",
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
            }}
          >
            Select the state color to change:
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <ColorButtons
            onPressAction={() => setModalVisible(true)}
            text={"Charging"}
            backgroundColor={"green"}
          />
          <ColorButtons
            onPressAction={() => setModalVisible(true)}
            text={"Suspended"}
            backgroundColor={"red"}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <ColorButtons
            onPressAction={() => setModalVisible(true)}
            text={"Authorized"}
            backgroundColor={"grey"}
          />
          <ColorButtons
            onPressAction={() => setModalVisible(true)}
            text={"Available"}
            backgroundColor={"blue"}
          />
        </View>
        <ColorPickerModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          actionCallback={() => setModalVisible(false)}
        />
      </Layout.Body>
      <Layout.Footer>
        <ChargerSettingsCard
          chargerId={chargerId}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
        />
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
