import React from 'react';

import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { charging } from './CardStyle';

const ChargerCard = ({ name, price, kwh, time, statusName, onClick }) => {
  const getBGColorByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return '#97A6AD';
      case 'idle':
        return '#97A6AD';
      case 'error':
        return '#darkred';
      default:
        return '#4F6363';
    }
  };
  const getTextColorByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return '#22EEAB';
      default:
        return 'white';
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onClick()}>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(statusName),
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={charging.upperTextContainer}>
              <View>
                <Text style={charging.locationText}>{name}</Text>

                {/* <Text style={charging.smallText}>Now</Text> */}
              </View>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(statusName),
                }}
              >
                {statusName}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <View style={{ flex: 1, marginTop: 'auto' }}>
                <Text
                  style={{
                    ...charging.chargingStatusText,
                    color: getTextColorByStatus(statusName),
                  }}
                >
                  {kwh}
                </Text>
                <Text style={charging.smallText}>Energy Delivered</Text>
              </View>
              <View style={{ flex: 1, marginTop: 'auto' }}>
                <Text
                  style={{
                    ...charging.chargingStatusText,
                    color: getTextColorByStatus(statusName),
                  }}
                >
                  {time}
                </Text>
                <Text style={charging.smallText}>Charge Duration</Text>
              </View>
              <View style={{ flex: 1, marginTop: 'auto' }}>
                <Text
                  style={{
                    ...charging.chargingStatusText,
                    color: getTextColorByStatus(statusName),
                  }}
                >
                  {price}
                </Text>
                <Text style={charging.smallText}>Amount Paid</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ChargerCard;
