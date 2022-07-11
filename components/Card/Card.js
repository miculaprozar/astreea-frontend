import React from "react";

import { Text, View, TouchableWithoutFeedback } from "react-native";
import { charging } from "./CardStyle";

const Card = ({
  device,
  isCharging,
  navigation,
  navigateToDevice,
  details,
}) => {
  console.log("THE DETAILS", details, isCharging);

  const navigateToDeviceAction = () => {
    console.log("LOGG!");
    navigateToDevice();
  };

  return (
    <TouchableWithoutFeedback onPress={navigateToDeviceAction}>
      <View
        style={
          details
            ? { ...charging.wrapper, backgroundColor: "#97A6AD" }
            : !isCharging
            ? { ...charging.wrapper, backgroundColor: "#393B3B" }
            : { ...charging.wrapper }
        }
      >
        <View style={{ flex: 1 }}>
          <View style={charging.upperTextContainer}>
            <View>
              <Text style={charging.locationText}>Office</Text>
              <Text style={charging.smallText}>Now</Text>
            </View>
            <Text
              style={
                !isCharging
                  ? { ...charging.chargingStatusText, color: "white" }
                  : { ...charging.chargingStatusText }
              }
            >
              Charging
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={
                  !isCharging
                    ? { ...charging.chargingValuesText, color: "white" }
                    : { ...charging.chargingValuesText }
                }
              >
                21.2 kWh
              </Text>
              <Text style={charging.smallText}>Energy Delivered</Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={
                  !isCharging
                    ? { ...charging.chargingValuesText, color: "white" }
                    : { ...charging.chargingValuesText }
                }
              >
                3h 34m
              </Text>
              <Text style={charging.smallText}>Charge Duration</Text>
            </View>
            <View style={{ flex: 1, marginTop: "auto" }}>
              <Text
                style={
                  !isCharging
                    ? { ...charging.chargingValuesText, color: "white" }
                    : { ...charging.chargingValuesText }
                }
              >
                21.12
              </Text>
              <Text style={charging.smallText}>Amount Paid</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
