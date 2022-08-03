import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {secondary, primary} from './ButtonStyle';

const Button = ({
  isSecondary,
  text,
  marginTop,
  marginBottom,
  onPressAction,
  children,
  disabled,
  buttonStyle,
}) => {
  let buttonType = isSecondary ? secondary : primary;

  return (
    <View
      style={
        buttonStyle
          ? buttonStyle
          : {marginTop: marginTop, marginBottom: marginBottom}
      }
    >
      <Pressable
        disabled={disabled}
        style={buttonType.container}
        onPress={onPressAction}
      >
        {text ? (
          <Text style={buttonType.text}>{text}</Text>
        ) : (
          children && <>{children}</>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
