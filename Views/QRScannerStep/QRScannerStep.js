import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import Button2 from '../../components/Button/Button';
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
      console.log(JSON.parse(data));
      data = JSON.parse(data);
    } catch (error) {
      setScanned(false);
      setLogType('error');
      setError("QR code doesn't contain the right data!");
      console.log('Data missing ConnectQR:102');
    }
    if (
      data.CertSerialNumber &&
      data.ChargerSerialNumber &&
      data.ConnectorId &&
      data.SSID
    ) {
      setQrModalVisible(false);
      var certUrl = `https://csmsdevstorage.blob.core.windows.net/clientcertificates/${data.CertSerialNumber}`;

      const certData = await axios.get(certUrl);

      global.cert = certData;
      const connection = global.connection;

      if (connection.state == HubConnectionState.Connected) {
        await connection
          .invoke('TryConnectCharger', data.ConnectorId, 'certificate')
          .then((chargerInfo) => {
            if (!chargerInfo.chargerEnrolled) {
              navigation.navigate('ConnectDevice', {
                qrData: {
                  wifiName: chargerInfo.aPUsername,
                  wifiPass: chargerInfo.aPPassWord,
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
        setError("QR code doesn't contain the right data!");
        console.log('Data missing ConnectQR:102');
      }, 1000);
    }
  };

  useEffect(() => {
    requestPermisionCamera();
  }, []);

  return (
    <Layout
      customBackgroundUrl={QRViewBackground}
      customLayoutStyle={{
        backgroundColor: 'transparent',
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
          navProps={route.params}
          route={route}
        />
      </Layout.Header>
      <Layout.Body>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Text style={style.title}>The only electric charger you need</Text>
        </View>

        <Text style={style.description}>
          Look for the QR code on the charger and scan it to connect it to your
          charger.
        </Text>
      </Layout.Body>
      <Layout.Footer>
        <Button2
          text={'Open Scanner'}
          marginTop={40}
          onPressAction={() => {
            if (hasPermission) {
              setQrModalVisible(true);
            } else {
              setLogType('error');
              setError('Please grant camera permission!');
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
            style={{ width: 300, height: '100%' }}
          />
          {error && (
            <SnackBar
              text={error}
              logSnackbar={error}
              setLogSnackbar={setError}
              logType={logType}
              customStyle={{ position: 'absolute', bottom: 0, left: 0 }}
            />
          )}
        </QRModal>
      </Layout.Footer>
    </Layout>
  );
};

export default QRScannerStep;
