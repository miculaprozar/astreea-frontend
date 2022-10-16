import React, { useState, useEffect } from "react";
import { Modal, View, Image } from "react-native";
import { styles } from "./Loader.style";

const Loader = ({ isLoading }) => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    !isLoading && setTimeout(() => setModalVisible(false), 400);
    isLoading && setModalVisible(true);
  }, [isLoading]);

  return (
    <View>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.centerWrapper}>
            <Image
              source={require("../../assets/loader.png")}
              style={{ height: 144, resizeMode: "contain" }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Loader;
