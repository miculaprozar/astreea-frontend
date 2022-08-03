import React, {useEffect, useState, useContext} from 'react';
import {Text, View, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {apiFactory} from '../../api';
import {style} from './Table.style';
import {Table, Row, Rows} from 'react-native-table-component';
import PillButton from '../PillButton/PillButton';
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

  const [rowsHeight, setRowsHeight] = useState(0);

  const [endList, setEndList] = useState(false);

  const getChargerDatesHistory = async (token, dates) => {
    try {
      console.log('trigger getChargerDatesHistory');
      const {data: theChargerHistory} = await apiFactory()
        .data.device()
        .chargerHistory(
          chargerId,
          page,
          tableItems,
          token,
          dates.splitStartDate ? dates : null,
        );

      // theChargerHistory.length === 0 && setEndList(true);

      // function onlyUnique(value, index, self) {
      //   return self.indexOf(value) === index;
      // }

      // const arrayToFIlter = [...chargerHistory, ...theChargerHistory];

      // const unique = arrayToFIlter.filter(onlyUnique);

      setChargerHistory(theChargerHistory);
    } catch (e) {
      console.log('the eeeee is ', e.response.data);
    }
  };

  const differenceDates = (startDate, endDate) => {
    var diffMs = endDate - startDate; // milliseconds between now & Christmas
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return `${diffHrs} H, ${diffMins} M`;
  };

  useEffect(() => {
    console.log('THE CARGER HISTORY IS:', chargerHistory);
    chargerHistory.length === 0 || chargerHistory.length < tableItems
      ? setExistsNextPage(false)
      : setExistsNextPage(true);

    if (chargerHistory.length !== 0) {
      const tableData = chargerHistory.map((item) => [
        item.startDate.split('T')[0],
        differenceDates(new Date(item.startDate), new Date(item.endDate)),
        Math.round(item.endKwh - item.startKwh).toFixed(2),
        Math.round((item.endKwh - item.startKwh) * 4.2).toFixed(2),
      ]);
      setTableData(tableData);
    } else setTableData([]);
  }, [chargerHistory]);

  useEffect(() => {
    if (tableDimension && rowsHeight !== 0) {
      const itemsInTable = Math.floor(tableDimension / (rowsHeight + 12));
      setTableItems(itemsInTable);
    }
  }, [tableDimension]);

  useEffect(() => {
    console.log('Page in UseEffect', page);
    if (token) {
      console.log('Send request for dates');
      const splitStartDate = tableStartDate?.toISOString().split('T')[0];
      const splitEndDate = tableEndDate?.toISOString().split('T')[0];
      getChargerDatesHistory(token, {splitStartDate, splitEndDate});
    }
  }, [token, page, tableStartDate, tableEndDate, tableItems]);

  const kwRenderer = (startKwh, endKwh) =>
    startKwh && endKwh ? endKwh - startKwh : '-- ';

  const tableHead = ['Date', 'Time', 'Kw', 'Cost'];

  return (
    <View style={style.container}>
      {tableData.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>
            No data recorded for this charger.
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{flex: 1}}
            onLayout={(event) => {
              const {height} = event.nativeEvent.layout;
              setTableDimension(height);
            }}
          >
            <Table>
              <Row data={tableHead} style={style.head} />
              <Rows
                data={tableData}
                style={style.text}
                textStyle={style.rowText}
                onLayout={(event) => {
                  const {height} = event.nativeEvent.layout;
                  setRowsHeight(height);
                }}
              />
            </Table>
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{flex: 1, marginRight: 10}}>
              <PillButton
                text={'Prev'}
                isSecondary
                onPressAction={() =>
                  page === 1 ? setPage(1) : setPage((prev) => prev - 1)
                }
              />
            </View>
            <View style={{flex: 1}}>
              <PillButton text={`Page: ${page}`} />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <PillButton
                text={'Next'}
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
