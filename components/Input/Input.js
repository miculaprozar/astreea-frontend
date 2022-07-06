import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { input, inputFocused, textStyle } from "./InputStyle";

const Input = ({ label, marginTop, marginBottom }) => {
  const [borderColor, setBorderColor] = useState(input);
  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <Text style={textStyle.text}>{label}</Text>
      <TextInput
        placeholder={`Enter your ${label.toLowerCase()}`}
        style={borderColor.input}
        onFocus={() => setBorderColor(inputFocused)}
        onBlur={() => setBorderColor(input)}
      />
    </View>
  );
};

export default Input;
