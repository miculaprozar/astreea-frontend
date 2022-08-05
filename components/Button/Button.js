import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { primary, secondary } from "./ButtonStyle";

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
  fill,
}) => {
  let buttonType = isSecondary ? secondary : primary;
  let fillButton = fill ? {} : buttonType.dontFill;
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
        style={{ ...buttonType.container, ...fillButton }}
        onPress={onPressAction}
      >
        {isLoading ? (
          () => <ActivityIndicator size={"small"} color={"#ff6400"} />
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
