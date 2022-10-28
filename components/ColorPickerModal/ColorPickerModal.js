import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";
import Slider from "@react-native-community/slider";

const ColorPickerModal = ({
  modalVisible,
  setModalVisible,

  actionCallback,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 1, maxHeight: 300 }}>
              <ColorPicker
                onColorSelected={(color) => alert(`Color selected: ${color}`)}
                style={{ flex: 1 }}
                sliderComponent={Slider}
                hideSliders={true}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => actionCallback()}
              >
                <Text style={[styles.textStyle]}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonTest]}
                onPress={() => actionCallback()}
              >
                <Text style={[styles.textStyle]}>Test color</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ColorPickerModal;

const styles = StyleSheet.create({
  modalView: {
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#44CD54",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonTest: {
    backgroundColor: "#97a6ad",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
