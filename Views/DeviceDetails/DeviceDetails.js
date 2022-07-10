import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { style } from './DeviceDetailsStyle';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AvoidingKeyboardWrapper from '../../components/GeneralComponents/AvoidingKeboardWrapper';

const DeviceDetails = () => {
  //   const navigateToSignUp = () => {
  //     navigation.navigate("SignUp");
  //   };
  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  return (
    <AvoidingKeyboardWrapper>
      <View style={style.wrapper}>
        <Text> Some text</Text>
        <View style={style.lastButtonContainer}>
          <Button text={'Add new charger'} />
        </View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default DeviceDetails;
