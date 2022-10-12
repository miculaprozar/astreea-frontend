import React, { useEffect, useState } from "react";
import { Text, Image, View } from "react-native";
import Button from "../../components/Button/Button";
import { style } from "./StartPairing.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import routes from "../../routes";
import DetailsBackground from "../../assets/qrBackground.jpg";
import SnackBar from "../../general_components/SnackBar";
import { apiFactory } from "../../api";
import QRViewBackground from "../../assets/qrBackground.jpg";
import ModalComponent from "../../components/Modal/Modal";
import QRModal from "../../components/Modal/QRModal";
import { BarCodeScanner } from "expo-barcode-scanner";

import Layout from "../../general_components/Layout";

const StartPairing = (props) => {
  const [error, setError] = useState(null);
  const [logType, setLogType] = useState("error");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const { navigation, route } = props;

  const { Home, StartPairing } = routes;

  const requestPermisionCamera = async () => {
    const permision = await BarCodeScanner.requestPermissionsAsync();
    console.log("Camera permision: ", permision.status === "granted");
    setHasPermission(permision.status === "granted");
  };

  const getToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("token");
      if (tokenValue !== null) {
        return tokenValue;
      }
    } catch (e) {
      console.log("Token Provider Error", e);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      data = JSON.parse(data);
    } catch (error) {
      setScanned(false);
      setLogType("error");
      setError("QR code doesn't contain the right data!");
      console.log("Data missing ConnectQR:102");
    }
    if (
      data.wifiName &&
      data.wifiPass &&
      data.wifiName !== "" &&
      data.wifiPass !== ""
    ) {
      setQrModalVisible(false);
      const token = await getToken();
      try {
        const checkData = await apiFactory()
          .data.device()
          .getChargerData(data.wifiName, token);
        if (checkData) {
          const response = await apiFactory()
            .data.account()
            .addExistingChargerToUser(token, data.wifiName);
          console.log(response);

          if (Array.isArray(response)) {
            setLogType("info");
            setError(
              "Device added successfully, please return to home screen!"
            );
          } else {
            setLogType("error");
            setError(response);
            setScanned(false);
          }
        }
      } catch (error) {
        if (JSON.parse(JSON.stringify(error)).status == "500") {
          console.log("Device Not Registered");
          navigation.navigate("ConnectDevice", { qrData: data });
        }
      }
    } else {
      setTimeout(() => {
        setScanned(false);
        setLogType("error");
        setError("QR code doesn't contain the right data!");
        console.log("Data missing ConnectQR:102");
      }, 1000);
    }
  };

  useEffect(() => {
    requestPermisionCamera();
  }, []);

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
          // onPressAction={() => navigateToHome()}
          onPressAction={() => {
            if (hasPermission) {
              setQrModalVisible(true);
            } else {
              setLogType("error");
              setError("Please grant camera permission!");
            }
          }}
        />
        <QRModal
          modalVisible={qrModalVisible}
          setModalVisible={setQrModalVisible}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={{ width: 300, height: "100%" }}
          />
          {error && (
            <SnackBar
              text={error}
              logSnackbar={error}
              setLogSnackbar={setError}
              logType={logType}
              customStyle={{ position: "absolute", bottom: 0, left: 0 }}
            />
          )}
        </QRModal>
      </Layout.Footer>
    </Layout>
  );
};

export default StartPairing;
