import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { primary, secondary, danger } from "./ButtonStyle";

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
  isDanger,
  half,
}) => {
  let buttonType = isSecondary ? secondary : isDanger ? danger : primary;
  let fillButton = fill ? {} : buttonType.dontFill;
  let halfButton = half ? buttonType.width100 : {};
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
        style={{
          ...buttonType.container,
          ...fillButton,
          ...halfButton,
          ...(disabled ? { backgroundColor: "#393B3B" } : {}),
        }}
        onPress={onPressAction}
      >
        {isLoading ? (
          () => <ActivityIndicator size={"small"} color={"#ffffff"} />
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
