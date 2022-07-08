import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { input, inputFocused, textStyle, inputDisabled } from "./InputStyle";

const Input = ({ label, marginTop, marginBottom, disabled }) => {
  const [borderColor, setBorderColor] = useState(input);
  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <Text style={textStyle.text}>{label}</Text>

      {disabled ? (
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder={`Request data`}
          style={inputDisabled.input}
          editable={false}
        />
      ) : (
        <TextInput
          placeholder={`Enter your ${label.toLowerCase()}`}
          style={borderColor.input}
          onFocus={() => setBorderColor(inputFocused)}
          onBlur={() => setBorderColor(input)}
        />
      )}
    </View>
  );
};

export default Input;
