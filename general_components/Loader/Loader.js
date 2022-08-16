import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, ActivityIndicator } from "react-native";

const Loader = ({ isLoading }) => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    !isLoading && setTimeout(() => setModalVisible(false), 400);
    isLoading && setModalVisible(true);
  }, [isLoading]);

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#FF6400" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
