import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import Button from "../../components/Button/Button";
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import Layout from '../../general_components/Layout';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { style } from './QRScannerStep.style';
import SnackBar from '../../general_components/SnackBar';
import { apiFactory } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRViewBackground from '../../assets/qrBackground.jpg';
import QRModal from '../../components/Modal/QRModal';
import { HubConnectionState } from '@microsoft/signalr';
import axios from 'axios';

const QRScannerStep = (props) => {
  const { navigation, route } = props;

  const [error, setError] = useState(null);
  const [logType, setLogType] = useState('error');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const requestPermisionCamera = async () => {
    const permision = await BarCodeScanner.requestPermissionsAsync();
    console.log('Camera permision: ', permision.status === 'granted');
    setHasPermission(permision.status === 'granted');
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      console.log("QR Text:" + data);
      var qrText = data.split(" ");      
      var readData = {
        ChargerSerialNumberCon: qrText[0] + "_" + qrText[1],
        CertThumbprint: qrText[2]
      }
      
      console.log("ChargerSerialNumberCon:" + readData.ChargerSerialNumberCon);
      console.log("CertThumbprint:" + readData.CertThumbprint);
    } catch (error) {
      setScanned(false);
      setLogType('error');
      setError("QR code format incorrect");
      console.log('Data missing ConnectQR:102:1: ' + data + " error:" + error);
    }
    
    if (
      readData.CertThumbprint &&
      readData.ChargerSerialNumberCon
    ) {
      setQrModalVisible(false);

      global.cert = readData.CertThumbprint;
      const connection = global.connection;

      if (connection.state == HubConnectionState.Connected) {
        await connection
          .invoke('TryConnectCharger', readData.ChargerSerialNumberCon, readData.CertThumbprint)
          .then((chargerInfo) => {
            if (!chargerInfo.chargerEnrolled) {
              console.log("Device enrollment info:" + JSON.stringify(chargerInfo))
              navigation.navigate('ConnectDevice', {
                qrData: {
                  wifiName: chargerInfo.apUserName,
                  wifiPass: chargerInfo.apPassword,
                },
              });
            } else {
              navigation.navigate('Home');
            }
          })
          .catch((err) => {
            console.log('THE ERROR IS', err);
          });
      }
    } else {
      setTimeout(() => {
        setScanned(false);
        setLogType('error');
        setError("QR code format incorrect");
        console.log('Data missing ConnectQR:102:2: ' + data + " error:" + error);
      }, 1000);
    }
  };

  useEffect(() => {
    requestPermisionCamera();
  }, []);

  return (
    <Layout customBackgroundUrl={QRViewBackground}>
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

export default QRScannerStep;
