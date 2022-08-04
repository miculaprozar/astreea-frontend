import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { primary, secondary } from './ButtonStyle';

const Button = ({
  isSecondary,
  text,
  marginTop,
  marginBottom,
  onPressAction,
  children,
  disabled,
  buttonStyle,
  isLoading,
}) => {
  let buttonType = isSecondary ? secondary : primary;

  return (
    <View
      style={
        buttonStyle
          ? buttonStyle
          : { marginTop: marginTop, marginBottom: marginBottom }
      }
    >
      <Pressable
        disabled={disabled}
        style={buttonType.container}
        onPress={onPressAction}
      >
        {isLoading ? (
          () => <ActivityIndicator size={'small'} color={'#ff6400'} />
        ) : (
          <>
            {text ? (
              <Text style={buttonType.text}>{text}</Text>
            ) : (
              children && <>{children}</>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
