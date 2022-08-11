import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { input, inputFocused, textStyle, inputDisabled } from "./InputStyle";
import { useForm, Controller } from "react-hook-form";

const Input = ({
  label,
  showLabel,
  placeholder,
  marginTop,
  marginBottom,
  disabled,
  validateInput,
  name,
  type,
  control,
  errors,
  onChange,
  secureTextEntry,
  value,
  controledChange,
}) => {
  const [borderColor, setBorderColor] = useState(input);

  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      {showLabel && <Text style={textStyle.text}>{label}</Text>}

      {disabled ? (
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder={`Request data`}
          style={inputDisabled.input}
          editable={false}
          value={value}
        />
      ) : validateInput ? (
        <>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => {
              controledChange && controledChange(value);
              return (
                <TextInput
                  placeholderTextColor="#7F7F7F"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  style={borderColor.input}
                  onChangeText={onChange}
                  onFocus={() => setBorderColor(inputFocused)}
                  onBlur={() => setBorderColor(input)}
                  value={value}
                  secureTextEntry={secureTextEntry}
                />
              );
            }}
            name={name}
          />
          {errors && <Text style={textStyle.errorText}>{errors}</Text>}
        </>
      ) : (
        <>
          <TextInput
            placeholder={
              placeholder ? placeholder : `Enter your ${label.toLowerCase()}`
            }
            style={borderColor.input}
            onFocus={() => setBorderColor(inputFocused)}
            onBlur={() => setBorderColor(input)}
            onChangeText={onChange}
            secureTextEntry={type === "password" ? true : false}
            value={value}
          />
          {errors && <Text style={textStyle.errorText}>{errors}</Text>}
        </>
      )}
    </View>
  );
};

export default Input;
