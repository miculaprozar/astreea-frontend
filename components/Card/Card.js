import React from 'react';

import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {charging} from './CardStyle';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import {useNavigation} from '@react-navigation/native';
import routes from '../../routes';

const Card = ({
  device,
  isCharging,
  navigateToDevice,
  details,
  name,
  price,
  id,
  kwh,
  lastCharge,
  hourMinutes,
  startStopData,
}) => {
  const navigation = useNavigation();
  const {DeviceDetails} = routes;
  const navigateToDeviceAction = () => {
    console.log('Before Sending Navigate: ', isCharging);
    navigation.navigate(DeviceDetails.name, {
      chargerId: id,
      isCharging,
      name,
      hourMinutes,
      startStopData,
      price,
    });
  };

  // const startDate = new Date(lastCharge.startDate);
  // const endDate = new Date(lastCharge.endDate);
  // const minutes = differenceInMinutes(startDate, endDate);

  return (
    <TouchableWithoutFeedback onPress={() => navigateToDeviceAction()}>
      <View
        style={
          details
            ? {...charging.wrapper, backgroundColor: '#97A6AD'}
            : !isCharging
            ? {...charging.wrapper, backgroundColor: '#393B3B'}
            : {...charging.wrapper}
        }
      >
        <View style={{flex: 1}}>
          <View style={charging.upperTextContainer}>
            <View>
              <Text style={charging.locationText}>{name}</Text>
              {/* <Text style={charging.smallText}>Now</Text> */}
            </View>
            <Text
              style={
                !isCharging
                  ? {...charging.chargingStatusText, color: 'white'}
                  : {...charging.chargingStatusText}
              }
            >
              {!details && isCharging && 'Charging'}
              {lastCharge?.length === 0 && 'Not used'}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <View style={{flex: 1, marginTop: 'auto'}}>
              <Text
                style={
                  !isCharging
                    ? {...charging.chargingValuesText, color: 'white'}
                    : {...charging.chargingValuesText}
                }
              >
                {kwh}
              </Text>
              <Text style={charging.smallText}>Energy Delivered</Text>
            </View>
            <View style={{flex: 1, marginTop: 'auto'}}>
              <Text
                style={
                  !isCharging
                    ? {...charging.chargingValuesText, color: 'white'}
                    : {...charging.chargingValuesText}
                }
              >
                {hourMinutes}
              </Text>
              <Text style={charging.smallText}>Charge Duration</Text>
            </View>
            <View style={{flex: 1, marginTop: 'auto'}}>
              <Text
                style={
                  !isCharging
                    ? {...charging.chargingValuesText, color: 'white'}
                    : {...charging.chargingValuesText}
                }
              >
                {price}
              </Text>
              <Text style={charging.smallText}>Amount Paid</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
