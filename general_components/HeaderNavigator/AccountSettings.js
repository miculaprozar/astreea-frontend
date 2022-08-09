import React, { useEffect, useState } from "react";
import { Text, Pressable, Image, View } from "react-native";
import { style } from "./HeaderNavigator.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountSettings = ({ navigation, route }) => {
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  const getName = async () => {
    try {
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");

      setName({ firstName, lastName });
    } catch (e) {
      console.log("Error getting firstName, lastName:", e);
      // error reading value
    }
  };

  useEffect(() => {
    getName();
  }, []);

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
