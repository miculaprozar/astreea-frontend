import React, { useEffect, useCallback, useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { style } from "./Schedule.style";
import ScheduleInput from "../../components/ScheduleInput/ScheduleInput";
import ChargingHistoryTable from "../../components/ChargingHistoryTable/CharginghistoryTable";
import { HubConnectionState } from "@microsoft/signalr";

const ScheduleV2 = (props) => {
  const { navigation, route } = props;
  const {
    route: {
      params: { chargerId },
    },
  } = props;
  const [chargerProfiles, setChargerProfiles] = useState(null);
  const connection = global.connection;

  const getChargerProfileList = async () => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke("GetChargingProfileList", chargerId)
        .then((profiles) => {
          console.log(profiles)
          setChargerProfiles(profiles);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  const deleteScheduleHandler = async (chargingProfileId) => {
      console.log(chargingProfileId);
  };

  useFocusEffect(
    useCallback(() => {
      getChargerProfileList();
    }, [connection])
  );

  return (
    <Layout diffuseBG={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
      </Layout.Header>
      <Layout.Body>
        <ScheduleInput />
        <ChargingHistoryTable chargerProfiles={chargerProfiles} deleteScheduleHandler={deleteScheduleHandler} />
      </Layout.Body>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default ScheduleV2;
