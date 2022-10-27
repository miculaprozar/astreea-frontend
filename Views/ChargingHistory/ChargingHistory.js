import React, { useEffect, useCallback, useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { style } from "./ChargingHistory.style";
import ScheduleInput from "../../components/ScheduleInput/ScheduleInput";
import ChargingHistoryTable from "../../components/ChargingHistoryTable/CharginghistoryTable";
import { HubConnectionState } from "@microsoft/signalr";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";

const ChargingHistory = (props) => {
  const { navigation, route } = props;

  const [chargingHistory, setChargingHistory] = useState(null);
  const { connectionStatus } = useContext(AuthContext);

  const connection = global.connection;

  const getChargingHistory = async (connection) => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke("GetChargingHistory", "1", 0, 10, new Date(), new Date())
        .then((chargings) => {
          console.log(chargings);
          setChargingHistory(chargings);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  useEffect(() => {
    const connection = global.connection;
    getChargingHistory(connection);
  }, [connectionStatus]);

  return (
    <Layout diffuseBG={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
        <View style={style.scheduleTableCard}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                borderRightWidth: 1,
                borderColor: "#FFFFFF",
                height: 25,
              }}
            >
              <Text style={style.headerText}>Start</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#FFFFFF",
                  width: "100%",
                }}
              ></View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                borderRightWidth: 1,
                borderColor: "#FFFFFF",
              }}
            >
              <Text style={style.headerText}>Stop</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#FFFFFF",
                  width: "100%",
                }}
              ></View>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                borderRightWidth: 1,
                borderColor: "#FFFFFF",
              }}
            >
              <Text style={style.headerText}>Kwh</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#FFFFFF",
                  width: "100%",
                }}
              ></View>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: "center",
                borderRightWidth: 1,
                borderColor: "#FFFFFF",
              }}
            >
              <Text style={style.headerText}>Charging Time</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#FFFFFF",
                  width: "100%",
                }}
              ></View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={style.headerText}>Delete</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#FFFFFF",
                  width: "100%",
                }}
              ></View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={style.lefDoubleWrapper}>
                <Text style={style.tableTextData}>0</Text>
              </View>
              <View style={style.rightDoubleWrapper}>
                <Text style={style.tableTextData}>0</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={style.lefDoubleWrapper}>
                <Text style={style.tableTextData}>0</Text>
              </View>
              <View style={style.rightDoubleWrapper}>
                <Text style={style.tableTextData}>0</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={style.entireWrapper}>
                <Text style={style.tableTextData}>0</Text>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  ...style.lefDoubleWrapper,
                  backgroundColor: "#484848",
                }}
              >
                <Text style={style.tableTextData}>0</Text>
              </View>
              <View
                style={{
                  ...style.rightDoubleWrapper,
                  backgroundColor: "#484848",
                }}
              >
                <Text style={style.tableTextData}>0</Text>
              </View>
            </View>
            <TouchableWithoutFeedback
              style={{
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => console.log("DELETE")}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View style={{}}>
                  <Image
                    source={require("../../assets/delete.png")}
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: "contain",
                      marginTop: 2,
                    }}
                  ></Image>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Layout.Header>
      <Layout.Body>
        {/* <ScheduleInput />
        <ChargingHistoryTable
          chargerProfiles={chargerProfiles}
          deleteScheduleHandler={deleteScheduleHandler}
        /> */}
      </Layout.Body>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default ChargingHistory;
