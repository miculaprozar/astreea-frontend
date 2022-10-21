import { yupResolver } from "@hookform/resolvers/yup";
import { HubConnectionState } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { apiFactory } from "../../api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Label from "../../components/Input/Label";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import SnackBar from "../../general_components/SnackBar";
import { style } from "./ChargerSettings.style";
import validationSchema from "./validationSchema";
import ChargerSettingsCard from "../../components/ChargerSettingsCard/ChargerSettingsCard";
import ChargerSettingsBackground from "../../assets/chargingScreen.jpg";
import ColorButtons from "../../components/ColorButtons/ColorButtons";
import ColorPickerModal from "../../components/ColorPickerModal/ColorPickerModal";
const ChargerSettings = ({ navigation, route }) => {
  const {
    params: { chargerId, serialNumberCon },
  } = route;

  console.log("THE  CHARGER ID AND THE SERIAL NUMBERCON:", serialNumberCon);

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
        {/* <Label text={"Name"} white={true} />
        <Input
          label={"Name"}
          marginBottom={12}
          validateInput={true}
          control={control}
          errors={errors.name?.message}
          name={"name"}
          secureTextEntry={false}
          disabled={!charger?.isAdmin ? true : false}
          value={charger?.name}
        />
        <Label text={"Address"} white={true} />
        <Input
          label={"Address"}
          marginBottom={12}
          validateInput={true}
          control={control}
          errors={errors.address?.message}
          name={"address"}
          secureTextEntry={false}
          disabled={!charger?.isAdmin ? true : false}
          value={charger?.address}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, marginRight: 7 }}>
            <Label text={"Currency"} white={true} />
            <Input
              label={"Currency"}
              marginBottom={12}
              validateInput={true}
              control={control}
              errors={errors.currency?.message}
              name={"currency"}
              secureTextEntry={false}
              disabled={!charger?.isAdmin ? true : false}
              value={charger?.currency}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 7 }}>
            <Label text={"Price"} white={true} />
            <Input
              label={"Price"}
              marginBottom={12}
              validateInput={true}
              control={control}
              errors={errors.price?.message}
              name={"price"}
              secureTextEntry={false}
              disabled={!charger?.isAdmin ? true : false}
              value={charger?.price.toString()}
            />
          </View>
        </View>
        {charger?.isAdmin && (
          <>
            <Label text={"Wifi name"} white={true} />
            <Input
              marginBottom={10}
              disabled={true}
              value={charger?.wiFiName}
            />
            <Label text={"Wifi strength"} white={true} />

            <Input
              marginBottom={25}
              disabled={true}
              value={charger?.wiFiStrength.toString()}
            />
          </>
        )} */}
      </Layout.Body>
      <Layout.Footer>
        {/* <View style={style.buttonsWrapper}>
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
              disabled={!charger?.isAdmin ? true : false}
              text={"Save settings"}
              isSecondary={true}
              half={true}
              onPressAction={handleSubmit(onSubmit)}
            />
          </View>
        </View> */}
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
