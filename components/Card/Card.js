import React from "react";

import { Text, View, TouchableWithoutFeedback } from "react-native";
import { charging } from "./CardStyle";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { useNavigation } from "@react-navigation/native";
import routes from "../../routes";
import Button from "../Button/Button";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ModalComponent from "../Modal/Modal";
import { apiFactory } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Card = ({
  device,
  isCharging,
  navigateToDevice,
  details,
  stateId,
  name,
  price,
  id,
  kwh,
  lastCharge,
  hourMinutes,
  startStopData,
}) => {
  const navigation = useNavigation();
  const { DeviceDetails } = routes;
  const navigateToDeviceAction = () => {
    navigation.navigate(DeviceDetails.name, {
      chargerId: id,
      isCharging,
      name,
      hourMinutes,
      startStopData,
      price,
    });
  };

  const [demoDeleteModalVisible, setDemoDeleteModalVisible] =
    React.useState(false);

  // const startDate = new Date(lastCharge.startDate);
  // const endDate = new Date(lastCharge.endDate);
  // const minutes = differenceInMinutes(startDate, endDate);

  const getToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("token");
      if (tokenValue !== null) {
        console.log(tokenValue);
        return tokenValue;
      }
    } catch (e) {
      console.log("ERROR IN READING", e);
      // error reading value
    }
  };

  const removeDEMOCharger = async () => {
    const token = await getToken();
    await apiFactory().data.account().removeExistingChargerFromUser(token);
    setDemoDeleteModalVisible(false);
  };

  return (
    <>
      {/* for Demo */}
      <TouchableWithoutFeedback
        onPress={() =>
          name && name == "Frank's Charger"
            ? navigateToDeviceAction()
            : console.log("DEMO")
        }
      >
        <View
          style={
            details && stateId == 1
              ? { ...charging.wrapper, backgroundColor: "#97A6AD" }
              : !isCharging && stateId == 1
                ? { ...charging.wrapper, backgroundColor: "#393B3B" }
                : stateId == 3
                  ? { ...charging.wrapper, backgroundColor: "darkred" }
                  : { ...charging.wrapper }
          }
        >
          <View style={{ flex: 1 }}>
            <View style={charging.upperTextContainer}>
              <View>
                <Text style={charging.locationText}>{name}</Text>

                {/* <Text style={charging.smallText}>Now</Text> */}
              </View>
              <Text
                style={
                  !isCharging
                    ? { ...charging.chargingStatusText, color: "white" }
                    : { ...charging.chargingStatusText }
                }
              >
                {!details && isCharging && "Charging"}
                {lastCharge?.length === 0 && stateId === 1 && "Available"}
                {stateId === 3 && "Error"}
              </Text>
              {/* FOR DEMO ONLY */}
              {name && name === "Frank's Charger" && (
                <Pressable
                  style={{
                    backgroundColor: "#ff6400",
                    borderRadius: 50,
                    width: 27,
                    height: 27,
                    position: "absolute",
                    right: 0,
                    bottom: -15,
                  }}
                  onPress={() => {
                    setDemoDeleteModalVisible(true);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#FFFFFF",
                      fontFamily: "Inter_700Bold",
                      textAlign: "center",
                      marginTop: -1,
                    }}
                  >
                    X
                  </Text>
                </Pressable>
              )}
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
                  {kwh}
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
                  {hourMinutes}
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
                  {price}
                </Text>
                <Text style={charging.smallText}>Amount Paid</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ModalComponent
        modalVisible={demoDeleteModalVisible}
        setModalVisible={setDemoDeleteModalVisible}
        modalText={
          "Are you sure you want to remove this charger from your list?"
        }
        actionText={"Remove"}
        actionCallback={removeDEMOCharger}
      ></ModalComponent>
    </>
  );
};

export default Card;
