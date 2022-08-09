import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
} from "react-native";
import QRMargins from "../../assets/qrMargins2.png";
const QRModal = ({
  children,
  modalVisible,
  setModalVisible,

  actionText,
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
            {children}
            <View
              style={{
                position: "absolute",
                top: "19%",
                left: "8.2%",
                width: 200,
                height: 200,
              }}
            >
              <ImageBackground
                style={{
                  width: "90%",
                  height: "90%",
                  margin: "10%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={QRMargins}
              ></ImageBackground>
            </View>
          </View>
          <Text style={styles.modalText}>
            Scan device QR code to register device
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default QRModal;

const styles = StyleSheet.create({
  modalView: {
    maxHeight: 325,
    maxWidth: 300,
    backgroundColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
