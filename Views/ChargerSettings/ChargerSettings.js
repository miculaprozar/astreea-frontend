import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { style } from "./ChargerSettingsStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import PillButton from "../../components/PillButton/PillButton";

import AvoidingKeyboardWrapper from "../../components/GeneralComponents/AvoidingKeboardWrapper";

const ChargerSettings = () => {
  return (
    <AvoidingKeyboardWrapper>
      <View style={style.wrapper}>
        <View style={{ flex: 1 }}>
          <Input label={"Charger name"} marginBottom={15} marginTop={15} />
          <View style={style.textAndPillsContainer}>
            <Text>curency</Text>
            <PillButton text={"All"} />
          </View>
          <View style={style.textAndPillsContainer}>
            <Text>curency</Text>
            <PillButton text={"All"} />
          </View>
        </View>
        <View style={{ flex: 1 }}></View>

        <View style={{ flex: 1 }}></View>
      </View>
    </AvoidingKeyboardWrapper>
  );
};

export default ChargerSettings;
