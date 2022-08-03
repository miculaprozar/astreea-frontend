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

    if (chargerHistory.length !== 0) {
      const tableData = chargerHistory.map((item) => [
        item.startDate.split("T")[0],
        item.endDate.split("T")[0],
        item.startKwh * 1,
        item.startKwh * 4.2,
      ]);
      setTableData(tableData);
    }
  }, [chargerHistory]);

  useEffect(() => {
    console.log("THE TABLE DIMENSIONS are:", tableDimension);
    if (tableDimension) {
      const itemsInTable = Math.floor(tableDimension / 46);
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

  const tableData2 = [
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
      <View style={style.container}>
        <View
          style={{ backgroundColor: "green", flex: 1 }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setTableDimension(height);
          }}
        >
          <Table>
            <Row data={tableHead} style={style.head} textStyle={style.text} />
            <Rows
              data={tableData ? tableData : tableData2}
              textStyle={style.text}
            />
          </Table>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
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
              onPressAction={() => setPage((prev) => prev + 1)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TableComponent;
