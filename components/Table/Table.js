import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, ScrollView, SafeAreaView } from "react-native";
import { apiFactory } from "../../api";
import { style } from "./Table.style";
import { Table, Row, Rows } from "react-native-table-component";
import PillButton from "../PillButton/PillButton";
const TableComponent = ({
  token,
  chargerId,
  tableStartDate,
  tableEndDate,
  setTableEndDate,
  setTableStartDate,
  price,
}) => {
  const [chargerHistory, setChargerHistory] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDimension, setTableDimension] = React.useState(null);
  const [tableItems, setTableItems] = useState(1);

  const [page, setPage] = useState(1);
  const [existsNextPage, setExistsNextPage] = useState(true);

  const [endList, setEndList] = useState(false);

  const getChargerDatesHistory = async (token, dates) => {
    try {
      console.log("trigger getChargerDatesHistory");
      const { data: theChargerHistory } = await apiFactory()
        .data.device()
        .chargerHistory(
          chargerId,
          page,
          tableItems,
          token,
          dates.splitStartDate ? dates : null
        );

      // theChargerHistory.length === 0 && setEndList(true);

      // function onlyUnique(value, index, self) {
      //   return self.indexOf(value) === index;
      // }

      // const arrayToFIlter = [...chargerHistory, ...theChargerHistory];

      // const unique = arrayToFIlter.filter(onlyUnique);

      setChargerHistory(theChargerHistory);
    } catch (e) {
      console.log("the eeeee is ", e.response.data);
    }
  };

  useEffect(() => {
    console.log("THE CARGER HISTORY IS:", chargerHistory);
    chargerHistory.length === 0 || chargerHistory.length < tableItems
      ? setExistsNextPage(false)
      : setExistsNextPage(true);

    if (chargerHistory.length !== 0) {
      const tableData = chargerHistory.map((item) => [
        item.startDate.split("T")[0],
        item.endDate.split("T")[0],
        Math.round(item.startKwh * 1).toFixed(2),
        Math.round(item.startKwh * 4.2).toFixed(2),
      ]);
      setTableData(tableData);
    } else setTableData([]);
  }, [chargerHistory]);

  useEffect(() => {
    if (tableDimension) {
      const itemsInTable = Math.floor(tableDimension / 40);
      setTableItems(itemsInTable);
    }
  }, [tableDimension]);

  useEffect(() => {
    console.log("Page in UseEffect", page);
    if (token) {
      console.log("Send request for dates");
      const splitStartDate = tableStartDate?.toISOString().split("T")[0];
      const splitEndDate = tableEndDate?.toISOString().split("T")[0];
      getChargerDatesHistory(token, { splitStartDate, splitEndDate });
    }
  }, [token, page, tableStartDate, tableEndDate, tableItems]);

  const kwRenderer = (startKwh, endKwh) =>
    startKwh && endKwh ? endKwh - startKwh : "-- ";

  const tableHead = ["Date", "Time", "Kw", "Cost"];

  return (
    <View style={style.container}>
      {tableData.length === 0 ? (
        <Text>No data</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{ backgroundColor: "green", flex: 1 }}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setTableDimension(height);
            }}
          >
            <Table>
              <Row data={tableHead} style={style.head} />
              <Rows data={tableData} style={style.text} />
            </Table>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "red",
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
              <PillButton text={`page: ${page}`} />
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
        </View>
      )}
    </View>
  );
};

export default TableComponent;
