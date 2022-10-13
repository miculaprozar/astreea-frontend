import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { style } from "./Schedule.style";
import ScheduleInput from "../../components/ScheduleInput/ScheduleInput";
import ChargingHistoryTable from "../../components/ChargingHistoryTable/CharginghistoryTable";
const ScheduleV2 = (props) => {
  const { navigation, route } = props;

  return (
    <Layout diffuseBG={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
      </Layout.Header>
      <Layout.Body>
        <ScheduleInput />
        <ChargingHistoryTable />
      </Layout.Body>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default ScheduleV2;
