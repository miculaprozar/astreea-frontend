import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
          <Text>No access to camera</Text>
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
