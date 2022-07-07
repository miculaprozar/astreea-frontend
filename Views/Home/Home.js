import React from "react";
import { Text, View, ScrollView } from "react-native";
import { style } from "./HomeStyle";
import SearchInput from "../../components/SearchInput/SearchInput";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";
import PillButton from "../../components/PillButton/PillButton";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
const Home = (props) => {
  const { navigation } = props;

  const navigateToAddDevice = () => {
    navigation.navigate("ConnectDeviceStep1");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={() => navigation.navigate("Account")}>settings </Text>
      ),
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("SignIn")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={style.wrapper}>
      <SearchInput />
      <View style={style.buttonsContainer}>
        <View style={{ flexDirection: "row", flex: 1, paddingTop: 20 }}>
          <View style={{ flex: 1 }}>
            <PillButton text={"All"} />
          </View>
          <View style={{ flex: 2 }}>
            <PillButton isSecondary text={"My chargers"} marginLeft={15} />
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
      </View>
      <View style={style.CardsContainer}>
        <ScrollView>
          <Card isCharging={true} />
          <Card isCharging={false} />

          <Card isCharging={false} />
          <Card isCharging={true} />
        </ScrollView>

        {/* <View style={{ flex: 1, backgroundColor: "red" }}></View>
        <View style={{ flex: 1, backgroundColor: "yellow" }}></View>
        <View style={{ flex: 1, backgroundColor: "blue" }}></View> */}
      </View>
      <View style={style.lastButtonContainer}>
        <Button
          text={"Add new charger"}
          marginTop={10}
          onPressAction={navigateToAddDevice}
        />
      </View>
    </View>
  );
};

export default Home;
