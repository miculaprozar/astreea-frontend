import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { apiFactory } from '../../api/index';
import Card from '../../components/Card/Card';
import ChargerButton from '../../components/ChargerButton/ChargerButton';
import PillButton from '../../components/PillButton/PillButton';
import Table from '../../components/Table/Table';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import routes from '../../routes';

import Calendar from '../../general_components/Calendar/Calendar';

import { style } from './DeviceDetails.style';

import Layout from '../../general_components/Layout';
import {
  getEndMonthDate,
  getFullMonthName,
  getStartMonthDate,
} from '../../helpers/dateFormatFunctions';
const DeviceDetails = (props) => {
  const { navigation } = props;
  const {
    route: {
      params: {
        chargerId,
        isCharging: isChargingProp,
        name,
        hourMinutes,
        startStopData,
        price,
      },
    },
  } = props;

  const { ChargerSettings } = routes;
  const [token, setToken] = useState(null);
  const [totalCharge, setTotalCharge] = useState(null);

  const [isCharging, setIsCharging] = useState(isChargingProp);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(getStartMonthDate(new Date()));

  const [triggerRefresh, setTriggerRefresh] = useState(false);

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

  useEffect(() => {
    console.log('Charging Props:', isChargingProp);

    setIsCharging(isChargingProp);
  }, [isChargingProp]);

  const demoGetEndKwh = (startDate, endDate) => {
    var diffMs = endDate - startDate; // milliseconds between now & Christmas
    var diffSec = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // seconds
    return diffSec * 0.2;
  };

  const StartStopCharging = async () => {
    try {
      setTriggerRefresh(true);
      if (isCharging) {
        await apiFactory()
          .data.device()
          .startStopCharging(
            {
              chargerId: chargerId,
              voltage: 1,
              current: 1,
              power: 1,
              endKwh:
                startStopData.endKwh + demoGetEndKwh(startDate, new Date()),
            },
            token
          );
      } else {
        await apiFactory().data.device().startStopCharging(
          {
            chargerId: chargerId,
            voltage: 1,
            current: 1,
            power: 1,
            startKwh: startStopData.endKwh,
          },
          token
        );
      }
      token && getChargerTotalData(token);
      setIsCharging(!isCharging);
      setTriggerRefresh(false);
    } catch (e) {
      console.log('ERROR IN START STOP CHARGING', e.response.data);
    }
  };

  const getChargerTotalData = async (token, dates) => {
    try {
      const totalCharge = await apiFactory()
        .data.device()
        .getTotalChargingData(chargerId, token, dates);
      setTotalCharge(totalCharge);
      console.log(totalCharge);
    } catch (e) {
      console.log('the eeeee is ', e.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    token && getChargerTotalData(token);
  }, [token]);

  const navigateToChargerSettings = () => {
    navigation.navigate(ChargerSettings.name);
  };

  // const setDates = (dates) => {
  //   if (dates.startDate) {
  //     setStartDate(dates.startDate);
  //     setTableStartDate(dates.startDate);
  //   }
  //   if (dates.endDate) {
  //     setEndDate(dates.endDate);
  //     setTableEndDate(dates.endDate);
  //   }
  // };

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     const requestStartDate = moment(startDate).format('YYYY-MM-DD');
  //     const requestEndDate = moment(endDate).format('YYYY-MM-DD');
  //     getChargerTotalData(token, { requestStartDate, requestEndDate });

  //     setTimeout(() => {
  //       SetIsCalendarOpen(false);
  //       setStartDate(null);
  //       setEndDate(null);
  //     }, 1000);
  //   }
  // }, [startDate, endDate]);

  const onSubmitDate = (date) => {
    setDate(date);
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      {!triggerRefresh ? (
        <>
          <Layout>
            <Layout.Header>
              <HeaderNavigator navigation={navigation} />
            </Layout.Header>
            <Layout.Body>
              <View style={style.tittleButtonWrapper}>
                <View style={{ flex: 2 }}>
                  <Text style={style.title}> {name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <PillButton
                    text={'Settings'}
                    isSecondary
                    onPressAction={navigateToChargerSettings}
                  />
                </View>
              </View>
              {!isCharging ? (
                <>
                  <View
                    style={{ ...style.tittleButtonWrapper, marginBottom: 10 }}
                  >
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <PillButton
                        text={getFullMonthName(date)}
                        onPressAction={() => setIsCalendarOpen(true)}
                      />
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}></View>
                  </View>

                  <Table
                    token={token}
                    chargerId={chargerId}
                    startDate={date}
                    endDate={getEndMonthDate(date)}
                    price={price}
                  />
                </>
              ) : (
                <View>
                  <Text style={style.chargingTitle}>Charging</Text>
                  <MaterialCommunityIcons
                    name='battery-medium'
                    size={350}
                    color='green'
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 30,
                    }}
                  />
                </View>
              )}
            </Layout.Body>
            <Layout.Footer style={{ flex: 2, backgroundColor: 'red' }}>
              {totalCharge && (
                <Card
                  isCharging={false}
                  details={true}
                  price={totalCharge.ammountSpent}
                  kwh={totalCharge.energyDelivered}
                  name={isCharging ? 'Charging' : 'Total'}
                  hourMinutes={`${Math.floor(
                    (totalCharge.chargeDuration % 86400000) / 3600000
                  )} H, ${Math.round(
                    ((totalCharge.chargeDuration % 86400000) % 3600000) / 60000
                  )} M`}
                />
              )}
              <View style={style.tittleButtonWrapper}>
                <View style={{ flex: 1 }}>
                  <ChargerButton
                    text={'Schedule'}
                    marginRight={10}
                    isSecondary={true}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ChargerButton
                    text={isCharging ? 'Stop' : 'Start'}
                    marginLeft={10}
                    isDanger={isCharging}
                    onPressAction={() => StartStopCharging()}
                  />
                </View>
              </View>
              <Calendar
                isOpen={isCalendarOpen}
                selected={date}
                handleSubmitDate={onSubmitDate}
              ></Calendar>
            </Layout.Footer>
          </Layout>
        </>
      ) : (
        <ActivityIndicator size={'large'} color={'#ff6400'}></ActivityIndicator>
      )}
    </>
  );
};

export default DeviceDetails;
