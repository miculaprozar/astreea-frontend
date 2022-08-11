import React from "react";
import { Text, Pressable, Image } from "react-native";
import { style } from "./HeaderNavigator.style";

const GoBack = ({ navigation, navProps, route }) => {
  return (
    <Pressable
      style={style.backAndArrowContainer}
      onPress={() => {
        if (navProps && navProps.onBack) {
          navProps.onBack();
        }
        navigation.goBack();
      }}
    >
      {route && route.name !== "SignIn" && route.name !== "Home" && (
        <>
          <Image
            style={style.backImage}
            source={require("../../assets/backWhite.png")}
          />
          <Text style={style.backButton}>Back</Text>
        </>
      )}

      {route && route.name === "SignIn" && (
        <Text style={style.leftText}>Build for a lifetime.</Text>
      )}
      {route && route.name === "Home" && (
        <Image
          style={style.chargerImage}
          source={require("../../assets/charger.png")}
        />
      )}
    </Pressable>
  );
};

export default GoBack;
