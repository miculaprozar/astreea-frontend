import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { format, compareAsc } from 'date-fns';

import { styles } from './Calendar.style';

const ModalComponent = ({ isOpen, handleSubmitDate, selected }) => {
  const [date, setDate] = useState(selected);

  useEffect(() => {
    setDate(selected);
  }, [selected]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          handleModalChange;
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <DatePicker
                mode='monthYear'
                selectorStartingYear={2000}
                current={getFormatedDate(new Date(date), 'YYYY/MM/DD')}
                selected={getFormatedDate(new Date(date), 'YYYY/MM/DD')}
                onMonthYearChange={(selectedDate) => {
                  const dateSplit = selectedDate.split(' ');
                  const selectedDateFormated = new Date(
                    dateSplit[0],
                    dateSplit[1] - 1,
                    2
                  );
                  setDate(selectedDateFormated);
                }}
                style={{ padding: 0, width: '100%' }}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleSubmitDate(date)}
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
