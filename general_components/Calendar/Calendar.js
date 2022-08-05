import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { format, compareAsc } from "date-fns";

import { styles } from "./Calendar.style";

const ModalComponent = ({ handleModalChange, modalText, modalVisible }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // const newDate = date.split(" ");

    console.log("the date is:", date);
  }, [date]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          handleModalChange;
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <DatePicker
                mode="monthYear"
                selectorStartingYear={2000}
                // onMonthYearChange={(selectedDate) => setDate(selectedDate)}
                // curent={format(new Date(2021, 6, 2), "yyyy-MM-dd")}
                // selected={getFormatedDate(
                //   new Date(2021, 8, 8),
                //   "jYYYY/jMM/jDD"
                // )}
                current={getFormatedDate(new Date(date), "YYYY/MM/DD")}
                selected={getFormatedDate(new Date(date), "YYYY/MM/DD")}
                onMonthYearChange={(selectedDate) => setDate(selectedDate)}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleModalChange()}
            >
              <Text style={styles.textStyle}>Save Date</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
