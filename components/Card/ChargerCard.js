import React, {useEffect, useRef} from 'react';

import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {charging} from './CardStyle';
import useTime from '../../helpers/useTime';

const ChargerCard = ({name, price, kwh, time, charger, onClick}) => {
  const [timer, setStartTimer] = useTime();
  const chargingState = useRef(null);
  const getBGColorByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return '#181A1B';
      case 'Not Used':
        return '#464C4E';
      case 'Disconnected/Error':
        return '#181A1B';
      case 'In use':
        return '#464C4E';
      default:
        return '#4F6363';
    }
  };
  const getTextColorByStatus = (statusName) => {
    switch (statusName) {
      case 'Charging':
        return '#22EEAB';
      case 'Disconnected/Error':
        return '#FF6400';
      case 'In use':
        return '#B1AAA0';
      case 'Not Used':
        return '#B1AAA0';
      default:
        return 'white';
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
          <View style={{flex: 1}}>
            <View style={charging.upperTextContainer}>
              <View>
                <Text
                  style={[
                    charging.locationText,
                    {color: getTextColorByStatus(charger.appStateName)},
                  ]}
                >
                  {name}
                </Text>

                {/* <Text style={charging.smallText}>Now</Text> */}
              </View>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: getTextColorByStatus(charger.appStateName),
                }}
              >
                {charger.appStateName}
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
                  style={{
                    ...charging.chargingStatusText,
                    color: getTextColorByStatus(charger.appStateName),
                  }}
                >
                  {kwh}
                </Text>
                <Text style={charging.smallText}>Energy Delivered</Text>
              </View>
              <View style={{flex: 1, marginTop: 'auto'}}>
                <Text
                  style={{
                    ...charging.chargingStatusText,
                    color: getTextColorByStatus(charger.appStateName),
                  }}
                >
                  {charger.isInCharge ? timer : time}
                </Text>
                <Text style={charging.smallText}>Charge Duration</Text>
              </View>
              <View style={{flex: 1, marginTop: 'auto'}}>
                <Text
                  style={{
                    ...charging.chargingStatusText,
                    color: getTextColorByStatus(charger.appStateName),
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
