import React, { useState, useEffect } from 'react';

import { Image, Text, View } from 'react-native';
import { chargeDate, chargeLastUsed } from '../../helpers/formatFunctions';
import { style } from './DetailsCard.style';

const DetailsCard = ({ price, kwh, time, charger, chargingStats }) => {
  const [chargerState, setChargerState] = useState(charger);
  const [chargingStatsState, setChargingStatsState] =
    useState(chargingStats);

  const connection = global.connection;

  connection.on('ChargerDetailsChanged', (changedCharger) => {
    if (changedCharger.chargerId === charger.chargerId) {
      setChargerState(changedCharger);
    }
  });

  connection.on('ChargingStatsChanged', (changedChargingStats) => {
    if (changedChargingStats.userId === chargingStats.userId) {
      setChargingStatsState(chargingStats);
    }
  });

  useEffect(() => {
    console.log('THE HISTORY STATE:', chargingStatsState.userId);
  }, [chargingStatsState]);

  useEffect(() => {
    setChargingStatsState(chargingStats);
  }, [chargingStats]);

  useEffect(() => {
    setChargerState(charger);
  }, [charger]);

  return (
    <>
      <View
        style={{
          ...style.wrapper,
        }}
      >
        <View style={style.upperTextContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={style.image}
              source={require('../../assets/greenLighting.png')}
            />

            <Text style={[style.locationText]}>{chargerState.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                ...style.chargingStatusText,
              }}
            >
              {chargerState.state}
            </Text>
            <View
              style={{
                ...style.circle,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
        <View style={style.lastUsedWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                ...style.circle,
                marginRight: 10,
              }}
            />

            <Text style={[style.locationText]}>
              {chargeLastUsed(chargerState)}
            </Text>
          </View>

          <Text
            style={{
              ...style.chargingStatusText,
            }}
          >
            {chargeDate(chargerState)}
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
                ...style.smallText,
              }}
            >
              Energy Delivered
            </Text>

            <Text
              style={{
                ...style.chargingValuesText,
              }}
            >
              {kwh}
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: 'auto' }}>
            <Text
              style={{
                ...style.smallText,
              }}
            >
              Charge Duration
            </Text>
            <Text
              style={{
                ...style.chargingValuesText,
              }}
            >
              {time}
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: 'auto' }}>
            <Text
              style={{
                ...style.smallText,
              }}
            >
              Amount Paid
            </Text>
            <Text
              style={{
                ...style.chargingValuesText,
              }}
            >
              {price}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DetailsCard;
