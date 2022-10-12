import React, { useEffect, useState } from 'react';

import {
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { chargeDate, chargeLastUsed } from '../../helpers/formatFunctions';
import { charging } from './CardStyle';
import {
  circleColor,
  getBGColorByStatus,
  getLightingImageByStatus,
  getTextColorByStatus,
  headerTextColor,
} from './getCardColorsByStatus';

const ChargerCard = ({ charger, onClick, isDetails = false }) => {
  const [chargerState, setChargerState] = useState(charger);

  const connection = global.connection;

  connection.on('ChargerStateChanged', (chargerStateChange) => {
    if (chargerState.SerialNumberCon === chargerStateChange.SerialNumberCon) {
      chargerState.state = changedCharger.State;
      setChargerState(chargerState);
    }
  });
  
  connection.on('ChargingChanged', (chargingChange) => {
    if (chargerState.SerialNumberCon === chargingChange.SerialNumberCon) {
      chargerState.LastChargingSession = chargingChange;
      setChargerState(chargerState);
    }
  });

  useEffect(() => {
    setChargerState(charger);
  }, [charger]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onClick && onClick()}>
        <View
          style={{
            ...charging.wrapper,
            backgroundColor: getBGColorByStatus(chargerState.state),
            ...(isDetails && {
              backgroundColor: 'rgba(255,255,255,0.30)',
              borderWidth: 1,
              borderColor: 'white',
            }),
            ...(chargerState.isAdmin &&
              chargerState.state === 'OutOfOrder' && { height: 180 }),
          }}
        >
          <View style={charging.upperTextContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={charging.image}
                source={getLightingImageByStatus(chargerState.state)}
              />

              <Text
                style={[
                  charging.locationText,
                  {
                    color: headerTextColor(chargerState, isDetails),
                  },
                ]}
              >
                {chargerState.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  ...charging.chargingStatusText,
                  color: headerTextColor(chargerState, isDetails),
                }}
              >
                {chargerState.state}
              </Text>
              <View
                style={{
                  ...charging.circle,
                  marginLeft: 10,
                  backgroundColor: circleColor(chargerState, 1),
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
                  backgroundColor: circleColor(chargerState, 0),
                }}
              />

              <Text
                style={[
                  charging.locationText,
                  {
                    color: getTextColorByStatus(chargerState.state, isDetails),
                  },
                  { fontSize: 12 },
                ]}
              >
                {chargeLastUsed(chargerState)}
              </Text>
            </View>

            <Text
              style={{
                ...charging.chargingStatusText,
                color: getTextColorByStatus(chargerState.state, isDetails),
                fontSize: 10,
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
                  ...charging.smallText,
                  ...(isDetails && { color: 'white' }),
                }}
              >
                Energy Delivered
              </Text>

              <Text
                style={{
                  ...charging.chargingValuesText,
                  color: getTextColorByStatus(chargerState.state, isDetails),
                }}
              >
                {chargerState.lastChargingSession
                  ? chargerState.lastChargingSession.chargedKWh
                  : '--'}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 'auto' }}>
              <Text
                style={{
                  ...charging.smallText,
                  ...(isDetails && { color: 'white' }),
                }}
              >
                Charge Duration
              </Text>
              <Text
                style={{
                  ...charging.chargingValuesText,
                  color: getTextColorByStatus(charger.state, isDetails),
                }}
              >
                {chargerState.lastChargingSession
                  ? chargerState.lastChargingSession.chargedTimeInSec
                  : '--'}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 'auto' }}>
              <Text
                style={{
                  ...charging.smallText,
                  ...(isDetails && { color: 'white' }),
                }}
              >
                Amount Paid
              </Text>
              <Text
                style={{
                  ...charging.chargingValuesText,
                  color: getTextColorByStatus(chargerState.state, isDetails),
                }}
              >
                {chargerState.lastChargingSession
                  ? chargerState.lastChargingSession.chargedCost
                  : '--'}
              </Text>
            </View>
          </View>
          {chargerState.isAdmin &&
            chargerState.state === 'OutOfOrder' ? (
            <Pressable
              style={charging.pairButtonWrapper}
              onPress={() => console.log('Pressed')}
            >
              <Text style={charging.pairButtonText}>PAIR AGAIN</Text>
            </Pressable>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ChargerCard;
