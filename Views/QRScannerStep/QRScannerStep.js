import { HubConnectionState } from "@microsoft/signalr";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Text } from "react-native";
import QRViewBackground from "../../assets/qrBackground.jpg";
import Button from "../../components/Button/Button";
import LogoBar from "../../components/LogoBar/LogoBar";
import QRModal from "../../components/Modal/QRModal";
import Layout from "../../general_components/Layout";
import SnackBar from "../../general_components/SnackBar";
import { style } from "./QRScannerStep.style";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";
import routes from "../../routes";
import { useFocusEffect } from "@react-navigation/native";
const QRScannerStep = (props) => {
  const { navigation } = props;
  const {
    DeviceDetails: { name: DeviceDetailsRoute },
    Home: { name: HomeRoute },
  } = routes;
  console.log("THE PROPS ARE:", props.numberOfChargers);

  const [error, setError] = useState(null);
  const [logType, setLogType] = useState("error");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const { connectionStatus } = useContext(AuthContext);

  const requestPermisionCamera = async () => {
    const permision = await BarCodeScanner.requestPermissionsAsync();
    console.log("Camera permision: ", permision.status === "granted");
    setHasPermission(permision.status === "granted");
  };

  const parentStack = navigation.getParent();
  console.log("The Parent stack", parentStack);

  const GetChargerSerialNumberConAndRedirect = async () => {
    const connection = global.connection;

    if (connection.state == HubConnectionState.Connected) {
      //connection started
      await connection
        .invoke("GetConnectedCharges", false, null)
        .then((chargerList) => {
          navigation.navigate("DeviceDetails", {
            serialNumberCon: chargerList[0].serialNumberCon,
          });
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      console.log("QR Text:" + data);
      var qrText = data.split(" ");
      var readData = {
        ChargerSerialNumberCon: qrText[0] + "_" + qrText[1],
        CertThumbprint: qrText[2],
      };

      console.log("ChargerSerialNumberCon:" + readData.ChargerSerialNumberCon);
      console.log("CertThumbprint:" + readData.CertThumbprint);
    } catch (error) {
      setScanned(false);
      setLogType("error");
      setError("QR code format incorrect");
      console.log("Data missing ConnectQR:102:1: " + data + " error:" + error);
    }

    if (readData.CertThumbprint && readData.ChargerSerialNumberCon) {
      setQrModalVisible(false);

      global.cert = readData.CertThumbprint;
      const connection = global.connection;

      if (connection.state == HubConnectionState.Connected) {
        await connection
          .invoke(
            "TryConnectCharger",
            readData.ChargerSerialNumberCon,
            readData.CertThumbprint
          )
          .then((chargerInfo) => {
            if (!chargerInfo.chargerEnrolled) {
              console.log(
                "Device enrollment info:" + JSON.stringify(chargerInfo)
              );
              // navigation.navigate("ConnectDevice", {
              //   qrData: {
              //     wifiName: chargerInfo.apUserName,
              //     wifiPass: chargerInfo.apPassword,
              //   },
              // });
              ///
            } else {
              props.numberOfChargersChanged();
              // navigation.pop();
            }
          })
          .catch((err) => {
            console.log("THE ERROR IS", err);
          });
      }
    } else {
      setTimeout(() => {
        setScanned(false);
        setLogType("error");
        setError("QR code format incorrect");
        console.log(
          "Data missing ConnectQR:102:2: " + data + " error:" + error
        );
      }, 1000);
    }
  };

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      return () => setScanned(false);
    }, [])
  );

  useEffect(() => {
    requestPermisionCamera();
  }, []);

  return (
    <Layout customBackgroundUrl={QRViewBackground}>
      <Layout.Header>
        <LogoBar />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>The only electric charger you need</Text>
      </Layout.Body>
      <Layout.Footer>
        <Button
          isSecondary={true}
          text={"START PAIRING"}
          marginBottom={60}
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
            style={style.scanner}
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

export default QRScannerStep;
