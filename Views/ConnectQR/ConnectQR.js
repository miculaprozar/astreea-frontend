import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import Button2 from "../../components/Button/Button";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import { BarCodeScanner } from "expo-barcode-scanner";
import { style } from "./ConnectQR.style";

const ConnectQR = (props) => {
  const { navigation } = props;

  const navigateToStep2 = () => {
    navigation.navigate("ConnectDevice");
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  const requestPermisionCamera = async () => {
    const permision = await BarCodeScanner.requestPermissionsAsync();

    setHasPermission(permision.status === "granted");
  };

  useEffect(() => {
    requestPermisionCamera();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <Layout.Body>
        <View
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <Text style={style.description}>
          Scan device QR code to register the device
        </Text>
        {hasPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : hasPermission === false ? (
          <Pressable onPress={() => requestPermisionCamera()}>
            <Text style={{ ...style.description, color: "red" }}>
              No access to camera. Click for request the acces
            </Text>
          </Pressable>
        ) : null}
      </Layout.Body>
      <Layout.Footer>
        <Button2
          text={"Scan QR"}
          marginTop={40}
          onPressAction={() => setScanned(false)}
        />
        <Button2
          text={"Scan QR (no registered device)"}
          marginTop={20}
          onPressAction={navigateToStep2}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default ConnectQR;
