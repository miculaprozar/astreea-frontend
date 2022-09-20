import { HubConnectionState } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";
import PillButton from "../PillButton/PillButton";
import { style } from "./Table.style";

const TableComponent = ({ chargerId, startDate, endDate }) => {
  const [tableData, setTableData] = useState([]);
  const [tableDimension, setTableDimension] = React.useState(null);
  const [tableItems, setTableItems] = useState(0);
  const [rowsHeight, setRowsHeight] = useState(0);

  const [page, setPage] = useState(1);
  const [existsNextPage, setExistsNextPage] = useState(true);

  const [chargingStats, setChargingStats] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const connection = global.connection;
  const tableHead = ["Date", "Time", "Kw", "Cost"];

  const differenceDates = (startDate, endDate) => {
    var diffMs = endDate - startDate; // milliseconds between now & Christmas
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return `${diffHrs} H, ${diffMins} M`;
  };

  const getChargingStats = async (requestStartDate, requestEndDate) => {
    if (connection.state == HubConnectionState.Connected) {
      try {
        setIsLoading(true);

        await connection
          .invoke(
            "GetChargingStats",
            chargerId,
            page,
            tableItems,
            requestStartDate,
            requestEndDate
          )
          .then((chargingStats) => {
            setChargingStats(chargingStats);
          });
        setIsLoading(false);
      } catch (e) {
        console.log("ERROR IN GetChargingStats", e.response.data);
      }
    }
  };

  useEffect(() => {
    const splitStartDate = startDate?.toISOString().split("T")[0];
    const splitEndDate = endDate?.toISOString().split("T")[0];
    getChargingStats(splitStartDate, splitEndDate);
  }, [page, startDate, endDate, tableItems]);

  useEffect(() => {
    chargingStats?.chargingSessions.length === 0 ||
      chargingStats?.chargingSessions.length <= tableItems
      ? setExistsNextPage(false)
      : setExistsNextPage(true);

    if (chargingStats && chargingStats?.chargingSessions.length !== 0) {
      const tableData = chargingStats?.chargingSessions.map((item) => [
        item.startDate.split("T")[0],
        differenceDates(new Date(item.startDate), new Date(item.endDate)),
        item.chargedKWh,
        item.chargedCost,
      ]);
      setTableData(tableData);
    } else setTableData([]);
  }, [chargingStats]);

  useEffect(() => {
    if (tableDimension && rowsHeight !== 0) {
      const itemsInTable = Math.floor(tableDimension / (rowsHeight + 12));
      setTableItems(itemsInTable);
    }
  }, [tableDimension]);

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
