import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { style } from "./SetupDevice.style";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import routes from "../../routes";
import Layout from "../../general_components/Layout";
import { Picker } from "@react-native-picker/picker";
import { apiFactory } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SnackBar from "../../general_components/SnackBar";

const SetupDevice = (props) => {
  const { navigation } = props;

  const { ConnectDevice } = routes;
  const [waitingForData, setWaitingForData] = useState(false);
  const [error, setError] = useState(null);
  const [logType, setLogType] = useState("error");

  const [selectedWifi, setSelectedWifi] = useState(
    props.route.params.wifiNetworks.wifiNames[0]
  );
  const [selectedWifiPassword, setSelectedWifiPassword] = useState();

  const sendDataToESP = async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      console.log(token);
      try {
        const data = await apiFactory()
          .data.device()
          .setupDevice(selectedWifi, selectedWifiPassword, token);
        console.log(data);
        if (data === "Device Connected to WiFi") {
        } else if (data === "Device Failed Connecting to WiFi") {
          setLogType("error");
          setError("Password is invalid!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout scrollView={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>Set up your device</Text>
        <Text style={style.description}>Wifi settings</Text>

        <Text style={style.label}>Select WiFi</Text>

        <View style={style.dropdown}>
          <Picker
            label={"Select wifi"}
            showLabel={true}
            selectedValue={selectedWifi}
            onValueChange={(itemValue, itemIndex) => setSelectedWifi(itemValue)}
          >
            {props.route.params.wifiNetworks.wifiNames.map((wifi, key) => {
              return (
                <Picker.Item key={"pwi-" + key} label={wifi} value={wifi} />
              );
            })}
          </Picker>
        </View>

        <Input
          label={"Password"}
          showLabel={true}
          marginBottom={15}
          marginTop={15}
          onChange={(text) => {
            setSelectedWifiPassword(text);
          }}
        />
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Verify set-up"}
          marginTop={10}
          marginBottom={35}
          onPressAction={() => sendDataToESP()}
        />
        {error && (
          <SnackBar
            text={error}
            logSnackbar={error}
            setLogSnackbar={setError}
            logType={logType}
          />
        )}
      </Layout.Footer>
    </Layout>
  );
};

export default SetupDevice;
