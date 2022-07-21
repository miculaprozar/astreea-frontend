import React, {useState} from 'react';
import {TextInput, Text, View} from 'react-native';
import {input, inputFocused, textStyle, inputDisabled} from './InputStyle';
import {useForm, Controller} from 'react-hook-form';

const Input = ({
  label,
  marginTop,
  marginBottom,
  disabled,
  validateInput,
  name,
  control,
  errors,
  onChange,
  secureTextEntry,
  value,
}) => {
  const [borderColor, setBorderColor] = useState(input);

  return (
    <View style={{marginTop: marginTop, marginBottom: marginBottom}}>
      <Text style={textStyle.text}>{label}</Text>

      {disabled ? (
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder={`Request data`}
          style={inputDisabled.input}
          editable={false}
        />
      ) : validateInput ? (
        <>
          <Controller
            control={control}
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder={`Enter your ${label.toLowerCase()}`}
                style={borderColor.input}
                onChangeText={onChange}
                onFocus={() => setBorderColor(inputFocused)}
                onBlur={() => setBorderColor(input)}
                value={value}
                secureTextEntry={secureTextEntry}
              />
            )}
            name={name}
          />
          {errors && <Text style={textStyle.errorText}>{errors}</Text>}
        </>
      ) : (
        <TextInput
          placeholder={`Enter your ${label.toLowerCase()}`}
          style={borderColor.input}
          onFocus={() => setBorderColor(inputFocused)}
          onBlur={() => setBorderColor(input)}
          onChangeText={onChange}
          value={value}
        />
      )}
    </View>
  );
};

export default Input;
