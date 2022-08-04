import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import { apiFactory } from '../../api/index.js';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import PillButton from '../../components/PillButton/PillButton';
import SearchInput from '../../components/SearchInput/SearchInput';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import Layout from '../../general_components/Layout';
import routes from '../../routes';

import {
  kwhRenderer,
  priceRenderer,
  hourMinutesRenderer,
} from '../../helpers/formatFunctions';

const Home = (props) => {
  const [canMessage, setCanMessage] = useState(true);

  const changeCanMessageCallback = () => {
    // setCanMessage(true);
  };

  const [token, setToken] = useState(null);
  const [chargers, setChargers] = useState(null);

  // WEBSOCKET CONNECTION
  const [socketUrl] = React.useState('ws://164.92.234.83:6003');
  const socketMessageHistory = React.useRef([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    retryOnError: true,
    shouldReconnect: () => {
      return true;
    },
    reconnectInterval: 10000,
    reconnectAttempts: Infinity,
    onClose: () => {
      console.log('Socket closed');
    },
    onError: (error) => {
      if (!error?.message?.includes('Failed to connect'))
        console.log('Socket error', error);
    },
    onOpen: () => {
      console.log('Socket opened');
    },
  });
  socketMessageHistory.current = React.useMemo(
    () => socketMessageHistory.current.concat(lastMessage),
    [lastMessage]
  );

  useEffect(() => {
    if (lastMessage?.data) {
      // console.log(JSON.parse(lastMessage.data.toString()));
      const messageData = JSON.parse(lastMessage.data.toString());
      console.log(Array.isArray(messageData));
      if (Array.isArray(messageData)) setChargers(messageData);
    }
  }, [lastMessage]);

  // // Use in case you need to show connectionStatus in the UI
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  // /////////////////////////////////////////////////////////////////////////
  const [getDevices, setGetDevices] = useState(null);

  const getDevicesHandler = () => {
    if (readyState === ReadyState.OPEN && token && canMessage) {
      setGetDevices(
        setInterval(() => {
          if (readyState === ReadyState.OPEN && token) {
            sendMessage(
              JSON.stringify({
                method: 'GetKnownDevices',
                token: token,
                user: 'Tudor',
              })
            );
          } else {
            clearInterval(getDevices);
          }
        }, 1000)
      );
    } else if (readyState === ReadyState.CONNECTING && token && canMessage) {
      console.log('Connecting Socket...');
    } else if (readyState === ReadyState.CLOSING && token && canMessage) {
      console.log('Closing Socket...');
      clearInterval(getDevices);
    } else if (readyState === ReadyState.CLOSED && token && canMessage) {
      console.log('Closed Socket...');
      clearInterval(getDevices);
    } else clearInterval(getDevices);
  };

  useEffect(() => {
    getDevicesHandler();
    clearInterval(getDevices);
  }, [readyState, canMessage]);

  const [myChargers, setMychargers] = useState(null);

  const [searchfield, setSearchfield] = useState('');

  const { navigation } = props;

  const { ConnectQR, DeviceDetails, Account, SignIn } = routes;

  const getData = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('token');
      setToken(tokenValue);
      if (tokenValue !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log('ERROR IN READING', e);
      // error reading value
    }
  };

  const filteredChargers =
    chargers &&
    chargers.length > 0 &&
    chargers.filter((charger) => {
      return charger.name.toLowerCase().includes(searchfield.toLowerCase());
    });

  const adminChargers =
    myChargers &&
    filteredChargers.filter((charger) => {
      return charger.isAdmin === myChargers;
    });

  useEffect(() => {
    getData();
  }, []);

  const navigateToAddDevice = () => {
    // clearInterval(getDevices);
    // setCanMessage(false);
    navigation.navigate(ConnectQR.name, { onBack: changeCanMessageCallback });
  };

  const isCharging = (lastCharge) => {
    return lastCharge.length > 0 && lastCharge[0].endKwh === null
      ? true
      : false;
  };

  const startStopData = (lastCharge) =>
    lastCharge.length === 0
      ? null
      : {
          startKwh: lastCharge[0].startKwh,
          endKwh: lastCharge[0].endKwh,
          voltage: lastCharge[0].voltage,
          current: lastCharge[0].current,
          power: lastCharge[0].power,
        };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideBack={true} />
      </Layout.Header>
      <Layout.Body>
        <SearchInput setSearchfield={setSearchfield} />
        <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <PillButton
              isSecondary={myChargers && true}
              text={'All'}
              onPressAction={() => setMychargers(null)}
            />
          </View>
          <View style={{ flex: 2 }}>
            <PillButton
              isSecondary={!myChargers && true}
              text={'My chargers'}
              marginLeft={15}
              onPressAction={() => setMychargers(1)}
            />
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
        <ScrollView>
          {chargers &&
          adminChargers &&
          chargers.length > 0 &&
          adminChargers.length > 0
            ? adminChargers.map((item) => (
                <Card
                  isCharging={isCharging(item.lastCharge)}
                  lastCharge={item.lastCharge}
                  kwh={kwhRenderer(item.lastCharge[0])}
                  price={priceRenderer(
                    item.lastCharge,
                    item.price,
                    item.currency
                  )}
                  key={
                    item.lastCharge.length > 0 ? item.lastCharge[0].id : item.id
                  }
                  name={item.name}
                  currency={item.currency}
                  stateId={item.stateId}
                  id={item.id}
                  hourMinutes={hourMinutesRenderer(item.lastCharge[0])}
                  startStopData={startStopData(item.lastCharge[0])}
                />
              ))
            : chargers &&
              chargers.length > 0 &&
              filteredChargers.map((item) => (
                <Card
                  isCharging={isCharging(item.lastCharge)}
                  lastCharge={item.lastCharge}
                  kwh={kwhRenderer(item.lastCharge[0])}
                  key={
                    item.lastCharge.length > 0 ? item.lastCharge[0].id : item.id
                  }
                  name={item.name}
                  currency={item.currency}
                  price={priceRenderer(
                    item.lastCharge[0],
                    item.price,
                    item.currency
                  )}
                  id={item.id}
                  stateId={item.stateId}
                  hourMinutes={hourMinutesRenderer(item.lastCharge[0])}
                  startStopData={startStopData(item.lastCharge)}
                />
              ))}
        </ScrollView>
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={'Add new charger'}
          marginTop={10}
          onPressAction={navigateToAddDevice}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
