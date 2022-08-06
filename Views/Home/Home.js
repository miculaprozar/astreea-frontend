import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import Button from '../../components/Button/Button';
import ChargerCard from '../../components/Card/ChargerCard';
import PillButton from '../../components/PillButton/PillButton';
import SearchInput from '../../components/SearchInput/SearchInput';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import Layout from '../../general_components/Layout';
import routes from '../../routes';

import {
  hourMinutesRenderer,
  kwhRenderer,
  priceRenderer,
} from '../../helpers/formatFunctions';

const Home = (props) => {
  const { navigation } = props;
  const { ConnectQR, DeviceDetails } = routes;

  const [token, setToken] = useState(null);
  const [canMessage, setCanMessage] = useState(true);
  const [chargers, setChargers] = useState(null);
  const [getDevices, setGetDevices] = useState(null);
  const [filterChargers, setFilterChargers] = useState(0);
  const [searchfield, setSearchfield] = useState('');

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
      const messageData = JSON.parse(lastMessage.data.toString());
      if (Array.isArray(messageData)) {
        setChargers(messageData);
      }
    }
  }, [lastMessage]);

  // // Use in case you need to show connectionStatus in the UI
  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState];
  // /////////////////////////////////////////////////////////////////////////

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

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    token && setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const changeCanMessageCallback = () => {};

  const navigateToAddDevice = () => {
    navigation.navigate(ConnectQR.name, { onBack: changeCanMessageCallback });
  };

  const navigateToDeviceAction = (charger) => {
    navigation.navigate(DeviceDetails.name, {
      chargerId: charger.id,
      isCharging:
        charger.lastCharge.length > 0 && charger.lastCharge[0].endKwh === null
          ? true
          : false,
      name: charger.name,
      hourMinutes: hourMinutesRenderer(charger.lastCharge[0]),
      startStopData: charger.lastCharge[0],
      price: priceRenderer(charger.lastCharge[0]),
      serialNumber: charger.serialNumber,
    });
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
              isSecondary={filterChargers && true}
              text={'Public'}
              onPressAction={() => setFilterChargers(0)}
            />
          </View>
          <View style={{ flex: 2 }}>
            <PillButton
              isSecondary={!filterChargers && true}
              text={'My chargers'}
              marginLeft={15}
              onPressAction={() => setFilterChargers(1)}
            />
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
        <ScrollView>
          {chargers &&
            chargers.length > 0 &&
            chargers
              .filter((charger) => {
                const isSearched = charger.name
                  .toLowerCase()
                  .includes(searchfield.toLowerCase());
                const isFiltered = charger.isAdmin === filterChargers;
                return isSearched && isFiltered;
              })
              .map((item, index) => (
                <ChargerCard
                  name={item.name}
                  kwh={kwhRenderer(item.lastCharge[0])}
                  time={hourMinutesRenderer(item.lastCharge[0])}
                  price={priceRenderer(
                    item.lastCharge[0],
                    item.price,
                    item.currency
                  )}
                  key={'charger_' + index}
                  charger={item}
                  onClick={() => navigateToDeviceAction(item)}
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
