import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { style } from "./SmallInput.style";
import { Controller } from "react-hook-form";

const SmallInput = ({ name, label, control, error }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                placeholderTextColor="rgba(255, 255, 255, 0.9)"
                placeholder={label}
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
                style={style.input}
              />
            );
          }}
          name={name}
        />
      </View>
      {error && <Text style={style.errorText}>{error.message}</Text>}
    </View>
  );
};

export default SmallInput;
