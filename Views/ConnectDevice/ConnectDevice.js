import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";

import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout";
import { style } from "./ConnectDevice.style";
import routes from "../../routes";
import { apiFactory } from "../../api";
import {
  PermissionsAndroid,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import WifiManager from "react-native-wifi-reborn";
import HeaderBackButton from "../../general_components/HeaderBackButton";
import SnackBar from "../../general_components/SnackBar";

const ConnectDevice = (props) => {
  const { navigation, route } = props;
  const { ConnectQR, SetupDevice } = routes;
  const [deviceHotspotName, setDeviceHotspotName] = useState(
    props.route.params ? props.route.params.qrData.wifiName : ""
  );
  const [deviceHotspotPass, setDeviceHotspotPass] = useState(
    props.route.params ? props.route.params.qrData.wifiPass : ""
  );

  const [logText, setLogText] = useState("");
  const [waitingForData, setWaitingForData] = useState(false);

  const [error, setError] = useState(null);
  const [logType, setLogType] = useState("error");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate(ConnectQR.name)} />
      ),
    });
  }, [navigation]);

  const logTime = () => {
    const currentDate = new Date();
    return (
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds() +
      " "
    );
  };

  const connectToWifi = async () => {
    WifiManager.getCurrentWifiSSID().then(
      async (ssid) => {
        console.log("Your current connected wifi SSID is " + ssid);
        if (ssid === deviceHotspotName) {
          setWaitingForData(true);
          const connectionStatus = await apiFactory()
            .data.device()
            .checkConnection();
          setLogText(logTime() + connectionStatus);
          if (connectionStatus === "Connection OK.") {
            const wifiNetworks = await apiFactory()
              .data.device()
              .availableWifiNetowrks();
            setWaitingForData(false);
            if (wifiNetworks.wifiNames.length > 0) {
              navigation.navigate(SetupDevice.name, { wifiNetworks });
            } else {
              // TODO: Notifcation for error and why
            }
          }
        } else {
          console.log("Not Device SSID!");
          WifiManager.connectToProtectedSSID(
            deviceHotspotName,
            deviceHotspotPass,
            false
          ).then(
            async () => {
              console.log("Connected successfully!");
              try {
                setWaitingForData(true);
                const connectionStatus = await apiFactory()
                  .data.device()
                  .checkConnection();
                setLogText(logTime() + connectionStatus);
                if (connectionStatus === "Connection OK.") {
                  const wifiNetworks = await apiFactory()
                    .data.device()
                    .availableWifiNetowrks();
                  setWaitingForData(false);
                  if (wifiNetworks.wifiNames.length > 0) {
                    navigation.navigate(SetupDevice.name, { wifiNetworks });
                  } else {
                    // TODO: Notifcation for error and why
                  }
                }
              } catch (e) {
                setWaitingForData(false);
                setLogText(logTime() + e);
                // TODO: Notifcation for error and why
              }
            },
            () => {
              setWaitingForData(false);
              console.log("Connection failed!");
            }
          );
        }
      },
      () => {
        setLogType("info");
        setError("Please start your device WiFi!");
      }
    );
  };

  const checkAndNavigateToSetup = async () => {
    const checkWifiPermisions = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!checkWifiPermisions) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission is required for WiFi connections",
          message:
            "This app needs location permission as this is required  " +
            "to scan for wifi networks.",
          buttonNegative: "DENY",
          buttonPositive: "ALLOW",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        connectToWifi();
      } else {
        // Permission denied
        // TODO: Notifcation for error and why
      }
    } else {
      connectToWifi();
    }
  };

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator
          navigation={navigation}
          hideAccountSettings={true}
          route={route}
        />
      </Layout.Header>
      <Layout.Body>
        <Text style={style.title}>Connect to Device</Text>
        <Input
          showLabel={true}
          label={"Hotspot name"}
          marginBottom={15}
          marginTop={15}
          value={deviceHotspotName}
          onChange={(inputValue) => {
            setDeviceHotspotName(inputValue);
          }}
        />
        <Input
          showLabel={true}
          label={"Password"}
          marginBottom={15}
          value={deviceHotspotPass}
          onChange={(inputValue) => {
            setDeviceHotspotPass(inputValue);
          }}
        />
        <Text style={style.description}>
          Connect with your phone to the device hotspot
        </Text>
      </Layout.Body>
      <Layout.Footer>
        <Button
          marginTop={10}
          marginBottom={35}
          onPressAction={() => {
            checkAndNavigateToSetup();
          }}
          disabled={waitingForData}
          children={
            <>
              {waitingForData ? (
                <ActivityIndicator
                  size={"large"}
                  color={"#ff6400"}
                ></ActivityIndicator>
              ) : (
                <Text>Test Connection</Text>
              )}
            </>
          }
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

export default ConnectDevice;
