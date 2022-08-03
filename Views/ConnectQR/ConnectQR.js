import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import Button2 from '../../components/Button/Button';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import Layout from '../../general_components/Layout';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {style} from './ConnectQR.style';
import SnackBar from '../../general_components/SnackBar';

const ConnectQR = (props) => {
  const {navigation} = props;

  const navigateToStep2 = () => {
    if (qrData) {
      navigation.navigate('ConnectDevice', {qrData});
    } else {
      setScanned(false);
      setError("QR Code not found or doesn't contain the right data!");
    }
  };

  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  const requestPermisionCamera = async () => {
    const permision = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(permision.status === 'granted');
  };

  useEffect(() => {
    requestPermisionCamera();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    data = JSON.parse(data);
    if (
      data.wifiName &&
      data.wifiPass &&
      data.wifiName !== '' &&
      data.wifiPass !== ''
    ) {
      setQrData(data);
    } else {
      setScanned(false);
    }
  };

  console.log(props.route.params);

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator
          navigation={navigation}
          hideAccountSettings={true}
          navProps={props.route.params}
        />
      </Layout.Header>
      <Layout.Body>
        <View
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
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
            <Text style={{...style.description, color: 'red'}}>
              No access to camera. Click for request the acces
            </Text>
          </Pressable>
        ) : null}
      </Layout.Body>
      <Layout.Footer>
        <Button2
          text={'Scan QR'}
          marginTop={40}
          onPressAction={() => setScanned(false)}
        />
        {error && (
          <SnackBar
            text={error}
            logSnackbar={error}
            setLogSnackbar={setError}
            logType="error"
          />
        )}
      </Layout.Footer>
    </Layout>
  );
};

export default ConnectQR;
