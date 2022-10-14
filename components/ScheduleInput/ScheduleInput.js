import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import {
  style,
  inputFocused,
  textStyle,
  inputDisabled,
} from "./ScheduleInput.style";
import { Switch } from "react-native-switch";
import LargeChargerButton from "../LargeChargerButton/LargeChargerButton";

const ScheduleInput = () => {
  const [firstSwitch, setFirstSwitch] = useState(false);
  const [secondSwitch, setSecondSwitch] = useState(false);

  const [startHour, setStartHour] = useState("");
  const [startMinutes, setStartMinutes] = useState("");

  const [endHour, setEndHour] = useState("");
  const [endMinutes, setEndMinutes] = useState("");

  const [kwh, setKwh] = useState("");

  const submitValues = () => console.log("THE VALUES SUBMITEd");

  const toggleSwitch = (booleanValue, theSwitch) => {
    theSwitch === 1
      ? setFirstSwitch(booleanValue)
      : setSecondSwitch(booleanValue);
  };
  return (
    <>
      <View style={{ marginBottom: 80 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={style.label}>Start</Text>
          <Text style={style.label}>Stop</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholderTextColor="#FFFFFF"
                  textAlign={"center"}
                  placeholder={`00`}
                  style={style.inputLeft}
                  keyboardType="number-pad"
                  value={startHour}
                  maxLength={2}
                  onChangeText={(hour) => {
                    if (Number(hour > 24)) {
                      setStartHour("24");
                    } else {
                      setStartHour(hour);
                    }
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={style.inputCenter}
                  placeholderTextColor="#FFFFFF"
                  keyboardType={"numeric"}
                  placeholder={`:`}
                  textAlign={"center"}
                  editable={false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={style.inputRight}
                  placeholderTextColor="#FFFFFF"
                  keyboardType={"numeric"}
                  placeholder={`00`}
                  textAlign={"center"}
                  value={startMinutes}
                  maxLength={2}
                  onChangeText={(minutes) => {
                    if (Number(minutes > 60)) {
                      setStartMinutes("60");
                    } else {
                      setStartMinutes(minutes);
                    }
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholderTextColor="#FFFFFF"
                  textAlign={"center"}
                  placeholder={`00`}
                  style={style.inputLeft}
                  keyboardType="number-pad"
                  value={endHour}
                  maxLength={2}
                  onChangeText={(hour) => {
                    if (Number(hour > 24)) {
                      setEndHour("24");
                    } else {
                      setEndHour(hour);
                    }
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={style.inputCenter}
                  placeholderTextColor="#FFFFFF"
                  keyboardType={"numeric"}
                  placeholder={`:`}
                  textAlign={"center"}
                  editable={false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={style.inputRight}
                  placeholderTextColor="#FFFFFF"
                  keyboardType={"numeric"}
                  placeholder={`00`}
                  textAlign={"center"}
                  value={endMinutes}
                  maxLength={2}
                  onChangeText={(minutes) => {
                    if (Number(minutes > 60)) {
                      setEndMinutes("60");
                    } else {
                      setEndMinutes(minutes);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={style.label}>kWh</Text>
          <Text style={style.label}>Settings</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholderTextColor="#FFFFFF"
                  textAlign={"center"}
                  placeholder={`00`}
                  style={style.fullInput}
                  keyboardType={"numeric"}
                  value={kwh}
                  onChangeText={(hour) => {
                    setKwh(hour);
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 5,
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Switch
                onValueChange={(val) => toggleSwitch(val, 1)}
                value={firstSwitch}
                activeText={""}
                inActiveText={""}
                backgroundActive={"black"}
                switchRightPx={4}
                switchLeftPx={4}
                circleBorderWidth={0}
                barHeight={33}
                circleSize={28}
              />
              <Text style={style.switchLabel}>Repeat</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Switch
                onValueChange={(val) => toggleSwitch(val, 2)}
                value={secondSwitch}
                activeText={""}
                inActiveText={""}
                backgroundActive={"black"}
                switchRightPx={4}
                switchLeftPx={4}
                circleBorderWidth={0}
                barHeight={33}
                circleSize={28}
              />
              <Text style={style.switchLabel}>Notify</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
      >
        <LargeChargerButton
          isSave={true}
          marginRight={20}
          onPressAction={submitValues}
        />
        <Text style={style.switchLabel}>Your charger is stand-by</Text>
      </View>
    </>
  );
};

export default ScheduleInput;
