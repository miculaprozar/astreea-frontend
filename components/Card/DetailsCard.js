import React, { useEffect, useRef } from 'react';

import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { charging } from './CardStyle';
import useTime from '../../helpers/useTime';
import { chargeDate, chargeLastUsed } from '../../helpers/formatFunctions';

const ChargerCard = ({ name, price, kwh, time, charger, onClick }) => {
  const [timer, setStartTimer] = useTime();
  const chargingState = useRef(null);
  const getBGColorByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return '#FFFFFF';
      case 'Not Used':
        return '#FFFFFF';
      case 'Disconnected/Error':
        return '#FFFFFF';
      case 'In use':
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  };
  const getTextColorByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return '#44CD54';
      case 'Disconnected/Error':
        return '#FF6400';
      case 'In use':
        return '#B1AAA0';
      case 'Not Used':
        return '#B1AAA0';
      default:
        return '#B1AAA0';
    }
  };

  const getLightingImageByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return require('../../assets/greenLighting.png');
      case 'Disconnected/Error':
        return require('../../assets/orangeLighting.png');
      case 'In use':
        return require('../../assets/greenLighting.png');
      case 'Not Used':
        return require('../../assets/greyLighting.png');
      default:
        return require('../../assets/greyLighting.png');
    }
  };

  useEffect(() => {
    if (
      charger.isInCharge &&
      (chargingState.current === null || chargingState.current === false)
    ) {
      setStartTimer(new Date(charger.lastCharge[0].startDate));
      chargingState.current = true;
    }
  }, [charger]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onClick()}>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(charger.appStateName),
          }}
        >
          <View style={charging.upperTextContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={charging.image}
                source={getLightingImageByStatus(charger.appStateName)}
              />

              <Text
                style={[
                  charging.locationText,
                  { color: getTextColorByStatus(charger.appStateName) },
                ]}
              >
                {name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appStateName),
                }}
              >
                {charger.appStateName}
              </Text>
              <View
                style={{
                  ...charging.circle,
                  marginLeft: 10,
                  backgroundColor: getTextColorByStatus(charger.appStateName),
                }}
              />
            </View>
          </View>
          <View style={charging.lastUsedWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  ...charging.circle,
                  marginRight: 10,
                  backgroundColor: getTextColorByStatus(charger.appStateName),
                }}
              />

              <Text
                style={[
                  charging.locationText,
                  { color: getTextColorByStatus(charger.appStateName) },
                  { fontSize: 12 },
                ]}
              >
                {chargeLastUsed(charger)}
              </Text>
            </View>

            <Text
              style={{
                ...charging.chargingStatusText,
                color: getTextColorByStatus(charger.appStateName),
                fontSize: 10,
              }}
            >
              {chargeDate(charger)}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1, marginTop: 'auto' }}>
              <Text style={charging.smallText}>Energy Delivered</Text>

              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appStateName),
                }}
              >
                {kwh}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 'auto' }}>
              <Text style={charging.smallText}>Charge Duration</Text>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appStateName),
                }}
              >
                {charger.isInCharge ? timer : time}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 'auto' }}>
              <Text style={charging.smallText}>Amount Paid</Text>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appStateName),
                }}
              >
                {price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ChargerCard;
