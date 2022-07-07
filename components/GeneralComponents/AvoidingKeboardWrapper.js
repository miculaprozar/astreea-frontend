import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
const AvoidingKeyboardWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F2F6F7" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AvoidingKeyboardWrapper;
