import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { apiFactory } from "../../api";
import { style } from "./Table.style";

const Table = ({
  token,
  chargerId,
  tableStartDate,
  tableEndDate,
  setTableEndDate,
  setTableStartDate,
  price,
}) => {
  const [chargerHistory, setChargerHistory] = useState([]);
  const [chargerDatesHistory, setChargerDatesHistory] = useState([]);

  useEffect(() => {
    console.log("THE TABLE ", price);
  }, [tableStartDate, tableEndDate]);

  const [page, setPage] = useState(0);
  const [pageDates, setPageDates] = useState(0);

  const [endList, setEndList] = useState(false);
  const [datesEndList, setDatesEndList] = useState(false);

  const getChargerHistory = async (token) => {
    try {
      const { data: theChargerHistory } = await apiFactory()
        .data.device()
        .chargerHistory(chargerId, page, 100, token);

      theChargerHistory.length === 0 && setEndList(true);

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      const arrayToFIlter = [...chargerHistory, ...theChargerHistory];

      const unique = arrayToFIlter.filter(onlyUnique);

      setChargerHistory(unique);
    } catch (e) {
      console.log("the eeeee is ", e);
    }
  };

  const getChargerDatesHistory = async (token, dates) => {
    try {
      const { data: theChargerHistory } = await apiFactory()
        .data.device()
        .chargerHistory(chargerId, page, 100, token, dates);

      theChargerHistory.length === 0 && setDatesEndList(true);

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      const arrayToFIlter = [...chargerHistory, ...theChargerHistory];

      const unique = arrayToFIlter.filter(onlyUnique);

      setChargerDatesHistory(arrayToFIlter);
    } catch (e) {
      console.log("the eeeee is ", e.response.data);
    }
  };

  useEffect(() => {
    console.log("THE ENDLIST IS", chargerDatesHistory);
  }, [chargerDatesHistory]);

  useEffect(() => {
    // token && getChargerHistory(token);
  }, [token, page]);

  useEffect(() => {
    if (token && tableStartDate && tableEndDate) {
      const splitStartDate = tableStartDate.toISOString().split("T")[0];
      const splitEndDate = tableEndDate.toISOString().split("T")[0];
      getChargerDatesHistory(token, { splitStartDate, splitEndDate });
    }
  }, [token, page, tableStartDate, tableEndDate]);

  const kwRenderer = (startKwh, endKwh) =>
    startKwh && endKwh ? endKwh - startKwh : "-- ";

  return (
    <>
      <View style={{ ...style.tableWrapper, borderBottomWidth: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Date</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Time</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Kw</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Cost</Text>
        </View>
      </View>
      <FlatList
        data={chargerDatesHistory}
        renderItem={({ item }) => {
          return (
            <View style={{ ...style.tableWrapper, marginBottom: 30 }}>
              <View style={{ flex: 1 }}>
                <Text>{item?.id}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>Time</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{kwRenderer(item.startKwh, item.endKwh)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>Cost</Text>
              </View>
            </View>
          );
        }}
        onEndReached={() => !datesEndList && setPageDates(pageDates + 1)}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        // extraData={page}
      />
    </>
  );
};

export default Table;
