import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import Button2 from "../../components/Button/Button";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import { BarCodeScanner } from "expo-barcode-scanner";
import { style } from "./ConnectQR.style";
import SnackBar from "../../general_components/SnackBar";
import { apiFactory } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRViewBackground from "../../assets/qrBackground.jpg";
import ModalComponent from "../../components/Modal/Modal";
import QRModal from "../../components/Modal/QRModal";

const ConnectQR = (props) => {
  const { navigation } = props;

  const [error, setError] = useState(null);
  const [logType, setLogType] = useState("error");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const requestPermisionCamera = async () => {
    const permision = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(permision.status === "granted");
  };

  const getToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("token");
      if (tokenValue !== null) {
        console.log(tokenValue);
        return tokenValue;
      }
    } catch (e) {
      console.log("ERROR IN READING", e);
      // error reading value
    }
  };

  const navigateToStep2 = () => {
    if (qrData) {
      navigation.navigate("ConnectDevice", { qrData });
    } else {
      setScanned(false);
      setLogType("error");
      setError("QR Code not found or doesn't contain the right data!");
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    data = JSON.parse(data);
    if (
      data.wifiName &&
      data.wifiPass &&
      data.wifiName !== "" &&
      data.wifiPass !== ""
    ) {
      setQrData(data);
    } else {
      setScanned(false);
    }
  };

  const handleDEMOAssociateDevice = async () => {
    console.log(qrData);
    if (qrData?.wifiName && qrData?.wifiName !== "") {
      let serialNumber = qrData.wifiName.replace(new RegExp("-", "g"), "");
      console.log(serialNumber);
      const token = await getToken();
      const response = await apiFactory()
        .data.account()
        .addExistingChargerToUser(token, serialNumber);
      if (Array.isArray(response)) {
        console.log(response);
        setLogType("info");
        setError("Device added successfully, please go back!");
      } else {
        setLogType("error");
        setError(response);
      }
    } else {
      setScanned(false);
      setLogType("error");
      setError("QR Code not found or doesn't contain the right data!");
    }
    // const token = await getToken();
    // console.log(token);
    // const response = await apiFactory()
    //   .data.account()
    //   .addExistingChargerToUser(token);
    // if (Array.isArray(response)) {
    //   console.log(response);
    //   setLogType('info');
    //   setError('Device added successfully, please go back!');
    // } else {
    //   setLogType('error');
    //   setError(response);
    // }
  };

  useEffect(() => {
    requestPermisionCamera();
  }, []);

  return (
    <Layout
      customBackgroundUrl={QRViewBackground}
      customLayoutStyle={{
        backgroundColor: "red",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <Layout.Header>
        <HeaderNavigator
          navigation={navigation}
          hideAccountSettings={true}
          navProps={props.route.params}
        />
      </Layout.Header>
      <Layout.Body>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFillObject}
          /> */}
          <Text style={style.title}>The only electric charger you need</Text>
        </View>

        <Text style={style.description}>
          Look for the QR code on the charger and scan it to connect it to your
          charger.
        </Text>
        {/* <Text style={style.description}>
          Scan device QR code to register the device
        </Text>
        {hasPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : hasPermission === false ? (
          <Pressable onPress={() => requestPermisionCamera()}>
            <Text style={{...style.description, color: 'red'}}>
              No access to camera. Click for request the acces
            </Text>
          </Pressable>
        ) : null} */}
      </Layout.Body>
      <Layout.Footer>
        <Button2
          text={"Open Scanner"}
          marginTop={40}
          onPressAction={() => setQrModalVisible(true)}
        />
        {error && (
          <SnackBar
            text={error}
            logSnackbar={error}
            setLogSnackbar={setError}
            logType={logType}
          />
        )}
        <QRModal
          modalVisible={qrModalVisible}
          setModalVisible={setQrModalVisible}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={{ width: 250, height: "100%" }}
          />
        </QRModal>
      </Layout.Footer>
    </Layout>
  );
};

export default ConnectQR;
