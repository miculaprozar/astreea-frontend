import React from 'react';
import { Pressable, View } from 'react-native';
import { button } from './ChargerButtonStyle';

import Icon from './Icon';

const ChargerButton = ({
  isSecondary,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onPressAction,
  isCharging,
}) => {
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    >
      <Pressable
        style={{
          ...button.container,
          ...(!isSecondary && { backgroundColor: 'rgba(0,186,255,0.11)' }),
          ...(isCharging && { backgroundColor: 'rgba(238,0,5,0.30)' }),
        }}
        onPress={onPressAction}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon isSecondary={isSecondary} />
        </View>
      </Pressable>
    </View>
  );
};

export default ChargerButton;
