import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/Button/Button';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';

import Input from '../../components/Input/Input';
import Layout from '../../general_components/Layout';
import {style} from './ConnectDevice.style';
import routes from '../../routes';
import {apiFactory} from '../../api';
import {PermissionsAndroid} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import HeaderBackButton from '../../general_components/HeaderBackButton';

const ConnectDevice = (props) => {
  const {navigation} = props;
  const {ConnectQR, SetupDevice} = routes;

  const [deviceHotspotName, setDeviceHotspotName] = useState(
    'Astreea-Charger-1',
  );
  const [deviceHotspotPass, setDeviceHotspotPass] = useState('astreeacharger1');

  const [logText, setLogText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate(ConnectQR.name)} />
      ),
    });
  }, [navigation]);

  const logTime = () => {
    const currentDate = new Date();
    return (
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds() +
      ' '
    );
  };

  const connectToWifi = async () => {
    console.log(WifiManager);
    WifiManager.connectToProtectedSSID(
      deviceHotspotName,
      deviceHotspotPass,
      false,
    ).then(
      async () => {
        console.log('Connected successfully!');
        try {
          const connectionStatus = await apiFactory()
            .data.device()
            .checkConnection();
          setLogText(logTime() + connectionStatus);
          if (connectionStatus === 'Connection OK.') {
            const wifiNetworks = await apiFactory()
              .data.device()
              .availableWifiNetowrks();

            if (wifiNetworks.wifiNames.length > 0) {
              navigation.navigate(SetupDevice.name, {wifiNetworks});
            } else {
              // TODO: Notifcation for error and why
            }
          }
        } catch (e) {
          setLogText(logTime() + e);
          // TODO: Notifcation for error and why
        }
      },
      () => {
        console.log('Connection failed!');
      },
    );
  };

  const checkAndNavigateToSetup = async () => {
    const checkWifiPermisions = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!checkWifiPermisions) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        connectToWifi();
      } else {
        // Permission denied
        // TODO: Notifcation for error and why
      }
    } else {
      connectToWifi();
    }
  };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>Connect to Device</Text>
        <Input
          label={'Hotspot name'}
          marginBottom={15}
          marginTop={15}
          onChange={(inputValue) => {
            setDeviceHotspotName(inputValue);
          }}
        />
        <Input
          label={'Password'}
          marginBottom={15}
          onChange={(inputValue) => {
            setDeviceHotspotPass(inputValue);
          }}
        />
        <Text style={style.description}>
          Connect with your phone to the device hotspot
        </Text>
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={'Test connection'}
          marginTop={10}
          marginBottom={35}
          onPressAction={checkAndNavigateToSetup}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default ConnectDevice;
