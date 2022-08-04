import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import PillButton from '../../components/PillButton/PillButton';
import SearchInput from '../../components/SearchInput/SearchInput';
import Layout from '../../general_components/Layout';
import routes from '../../routes';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiFactory} from '../../api/index.js';
import useWebSocket, {ReadyState} from 'react-native-use-websocket';
import moment from 'moment';

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
  const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl, {
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
    [lastMessage],
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
                user: 'Frank',
              }),
            );
          } else {
            clearInterval(getDevices);
          }
        }, 1000),
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

  const {navigation} = props;

  const {ConnectQR, DeviceDetails, Account, SignIn} = routes;

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

  const getUserChargers = async (token) => {
    try {
      const userChargers = await apiFactory()
        .data.account()
        .getUserCharger(token);
      console.log('Chargers From Normal', userChargers);
      setChargers(userChargers);
    } catch (e) {
      console.log('the eeeee is ', e.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToAddDevice = () => {
    // clearInterval(getDevices);
    // setCanMessage(false);
    navigation.navigate(ConnectQR.name, {onBack: changeCanMessageCallback});
  };

  const kwhRenderer = (lastCharge) => {
    // console.log("THE LAST CHARGE DATA IS:", lastCharge);
    return lastCharge.length === 0 || lastCharge[0].endKwh === null
      ? '-- kWh'
      : lastCharge[0].endKwh - lastCharge[0].startKwh + ' kWh';
  };

  const priceRenderer = (lastCharge, price, curency) =>
    lastCharge.length === 0 || lastCharge[0].endKwh === null
      ? '-- '
      : (price * (lastCharge[0].endKwh - lastCharge[0].startKwh)).toFixed(2) +
        ' ' +
        curency;

  const differenceDates = (startDate, endDate) => {
    var diffMs = endDate - startDate; // milliseconds between now & Christmas
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return `${diffHrs} H, ${diffMins} M`;
  };

  const hourMinutesRenderer = (lastCharge) =>
    lastCharge.length === 0 || lastCharge[0].endKwh === null
      ? '-- hh:mm '
      : differenceDates(
          new Date(lastCharge[0].startDate),
          new Date(lastCharge[0].endDate),
        );

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
        <View style={{flexDirection: 'row', marginBottom: 20, marginTop: 10}}>
          <View style={{flex: 1}}>
            <PillButton
              isSecondary={myChargers && true}
              text={'All'}
              onPressAction={() => setMychargers(null)}
            />
          </View>
          <View style={{flex: 2}}>
            <PillButton
              isSecondary={!myChargers && true}
              text={'My chargers'}
              marginLeft={15}
              onPressAction={() => setMychargers(1)}
            />
          </View>
          <View style={{flex: 2}}></View>
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
                  kwh={kwhRenderer(item.lastCharge)}
                  price={priceRenderer(
                    item.lastCharge,
                    item.price,
                    item.currency,
                  )}
                  key={
                    item.lastCharge.length > 0 ? item.lastCharge[0].id : item.id
                  }
                  name={item.name}
                  currency={item.currency}
                  stateId={item.stateId}
                  id={item.id}
                  hourMinutes={hourMinutesRenderer(item.lastCharge)}
                  startStopData={startStopData(item.lastCharge)}
                />
              ))
            : chargers &&
              chargers.length > 0 &&
              filteredChargers.map((item) => (
                <Card
                  isCharging={isCharging(item.lastCharge)}
                  lastCharge={item.lastCharge}
                  kwh={kwhRenderer(item.lastCharge)}
                  key={
                    item.lastCharge.length > 0 ? item.lastCharge[0].id : item.id
                  }
                  name={item.name}
                  currency={item.currency}
                  price={priceRenderer(
                    item.lastCharge,
                    item.price,
                    item.currency,
                  )}
                  id={item.id}
                  stateId={item.stateId}
                  hourMinutes={hourMinutesRenderer(item.lastCharge)}
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
