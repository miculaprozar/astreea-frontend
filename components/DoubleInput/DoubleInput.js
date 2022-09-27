import React from "react";
import { TextInput, Text, View } from "react-native";
import { style } from "./DoubleInput.style";
import { Controller } from "react-hook-form";

const DoubleInput = ({
  firstInputName,
  secondInputName,
  firstInputError,
  secondInputError,
  label,
  firstInputPlaceholder,
  secondInputPlaceholder,
  control,
  marginLeft,
}) => {
  return (
    <View style={{ alignItems: "center", marginLeft: marginLeft }}>
      <Text>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                placeholderTextColor="rgba(255, 255, 255, 0.9)"
                placeholder={firstInputPlaceholder}
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
                style={{
                  ...style.input,
                  ...style.leftInput,
                }}
              />
            );
          }}
          name={firstInputName}
        />
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                placeholderTextColor="rgba(255, 255, 255, 0.9)"
                placeholder={secondInputPlaceholder}
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
                style={{
                  ...style.input,
                  ...style.rightInput,
                }}
              />
            );
          }}
          name={secondInputName}
        />
      </View>
      {(firstInputError || secondInputError) && (
        <Text style={style.errorText}>
          {firstInputError ? firstInputError.message : secondInputError.message}
        </Text>
      )}
    </View>
  );
};

export default DoubleInput;
