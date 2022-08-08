import React from 'react';
import { Text } from 'react-native';
import { style } from './Label.style';

const Label = ({ white = false, text }) => {
  return (
    <Text style={white ? style.whiteText : style.defaultText}>{text}</Text>
  );
};

export default Label;
