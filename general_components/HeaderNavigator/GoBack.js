import React from 'react';
import {Text, Pressable} from 'react-native';
import {style} from './HeaderNavigator.style';
import {AntDesign} from '@expo/vector-icons';

const GoBack = ({navigation, navProps}) => (
  <Pressable
    style={style.backAndArrowContainer}
    onPress={() => {
      if (navProps && navProps.onBack) {
        navProps.onBack();
      }
      navigation.goBack();
    }}
  >
    <AntDesign name="arrowleft" size={18} color="#FF6400" />
    <Text style={style.backButton}>Back</Text>
  </Pressable>
);

export default GoBack;
