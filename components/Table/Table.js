import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { apiFactory } from "../../api";
import { style } from "./Table.style";
import { Table, Row, Rows } from "react-native-table-component";
import PillButton from "../PillButton/PillButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HubConnectionState } from "@microsoft/signalr";

const TableComponent = ({ chargerId, startDate, endDate }) => {
  const [chargerHistory, setChargerHistory] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDimension, setTableDimension] = React.useState(null);
  const [tableItems, setTableItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [chargingHistory, setChargingHistory] = useState(null);

  const [page, setPage] = useState(1);
  const [existsNextPage, setExistsNextPage] = useState(true);

  const [rowsHeight, setRowsHeight] = useState(0);

  const connection = global.connection;

  const getChargerDatesHistory = async (dates) => {
    try {
      setIsLoading(true);

      const tokenValue = await AsyncStorage.getItem("token");
      const { data: theChargerHistory } = await apiFactory()
        .data.device()
        .chargerHistory(
          chargerId,
          page,
          tableItems,
          tokenValue,
          dates.splitStartDate ? dates : null
        );
      setChargerHistory(theChargerHistory);
      setIsLoading(false);
    } catch (e) {}
  };

  const getChargingHistory = async (requestStartDate, requestEndDate) => {
    if (connection.state == HubConnectionState.Connected) {
      await connection
        .invoke(
          "GetChargingHistory",
          chargerId,
          page,
          tableItems,
          requestStartDate,
          requestEndDate
        )
        .then((chargingHistory) => {
          setChargingHistory(chargingHistory);
        });
    }
  };

  useEffect(() => {
    const splitStartDate = startDate?.toISOString().split("T")[0];
    const splitEndDate = endDate?.toISOString().split("T")[0];
    getChargingHistory(splitStartDate, splitEndDate);
  }, [page, startDate, endDate, tableItems]);

  console.log("THe chargin history", chargingHistory);

  const differenceDates = (startDate, endDate) => {
    var diffMs = endDate - startDate; // milliseconds between now & Christmas
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return `${diffHrs} H, ${diffMins} M`;
  };

  useEffect(() => {
    chargingHistory?.chargingSessions.length === 0 ||
    chargingHistory?.chargingSessions.length === 0 < tableItems
      ? setExistsNextPage(false)
      : setExistsNextPage(true);

    if (chargingHistory?.chargingSessions.length !== 0) {
      const tableData = chargingHistory?.chargingSessions.map((item) => [
        item.startDate.split("T")[0],
        differenceDates(new Date(item.startDate), new Date(item.endDate)),
        item.chargedKWh,
        item.chargedCost,
      ]);
      setTableData(tableData);
    } else setTableData([]);
  }, [chargingHistory]);

  // useEffect(() => {
  //   chargerHistory.length === 0 || chargerHistory.length < tableItems
  //     ? setExistsNextPage(false)
  //     : setExistsNextPage(true);

  //   if (chargerHistory.length !== 0) {
  //     const tableData = chargerHistory.map((item) => [
  //       item.startDate.split("T")[0],
  //       differenceDates(new Date(item.startDate), new Date(item.endDate)),
  //       Math.round(item.endKwh - item.startKwh).toFixed(2),
  //       Math.round((item.endKwh - item.startKwh) * 4.2).toFixed(2),
  //     ]);
  //     setTableData(tableData);
  //   } else setTableData([]);
  // }, [chargerHistory]);

  useEffect(() => {
    if (tableDimension && rowsHeight !== 0) {
      const itemsInTable = Math.floor(tableDimension / (rowsHeight + 12));
      setTableItems(itemsInTable);
    }
  }, [tableDimension]);

  useEffect(() => {
    const splitStartDate = startDate?.toISOString().split("T")[0];
    const splitEndDate = endDate?.toISOString().split("T")[0];
    getChargerDatesHistory({ splitStartDate, splitEndDate });
  }, [page, startDate, endDate, tableItems]);

  const tableHead = ["Date", "Time", "Kw", "Cost"];

  return (
    <View style={style.container}>
      {!isLoading ? (
        <>
          {tableData.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                No data recorded for this charger.
              </Text>
            </View>
          ) : (
            <>
              <View
                style={{ flex: 1 }}
                onLayout={(event) => {
                  const { height } = event.nativeEvent.layout;
                  setTableDimension(height - 40);
                }}
              >
                <Table>
                  <Row data={tableHead} style={style.head} />
                  <Rows
                    data={tableData}
                    style={style.text}
                    textStyle={style.rowText}
                    onLayout={(event) => {
                      const { height } = event.nativeEvent.layout;
                      setRowsHeight(height);
                    }}
                  />
                </Table>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1, marginRight: 10 }}>
                  <PillButton
                    text={"Prev"}
                    isSecondary
                    onPressAction={() =>
                      page === 1 ? setPage(1) : setPage((prev) => prev - 1)
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <PillButton text={`Page: ${page}`} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <PillButton
                    text={"Next"}
                    isSecondary
                    onPressAction={() =>
                      existsNextPage && setPage((prev) => prev + 1)
                    }
                  />
                </View>
              </View>
            </>
          )}
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#FF6400" />
        </View>
      )}
    </View>
  );
};

export default TableComponent;
