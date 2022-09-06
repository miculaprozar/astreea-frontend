import React, { useState, useCallback, useEffect } from "react";
import { Text, Pressable, Image, View } from "react-native";
import { style } from "./HeaderNavigator.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const AccountSettings = ({ navigation, route }) => {
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  useFocusEffect(
    useCallback(() => {
      getName();
    }, [])
  );

  const getName = async () => {
    try {
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");

      setName({ firstName: firstName, lastName: lastName });
    } catch (e) {
      console.log("Error getting firstName, lastName:", e);
      // error reading value
    }
  };

  return (
    <>
      {route && route.name === "Home" && name.firstName !== "" && (
        <Pressable onPress={() => navigation.navigate("Account")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Text style={style.nameText}>{name.firstName}</Text>
              <Text style={style.nameText}>{name.lastName}</Text>
            </View>
            <Image
              style={style.titleWhite}
              source={require("../../assets/myAccount.png")}
            />
          </View>
        </Pressable>
      )}

      {(route?.name !== "Home" || name.firstName === "") && (
        <Image
          style={style.titleWhite}
          source={require("../../assets/titleWhite.png")}
        />
      )}
    </>
  );
};

export default AccountSettings;
