import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import PillButton from "../../components/PillButton/PillButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import HeaderBackButton from "../../general_components/HeaderBackButton";
import Layout from "../../general_components/Layout";
import routes from "../../routes";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = (props) => {
  const { navigation } = props;

  const { ConnectQR, DeviceDetails, Account, SignIn } = routes;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log("THE TOKEN IS:", value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log("ERROR IN READING", e);
      // error reading value
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (exception) {}
  };

  useEffect(() => {
    getData();
    removeToken();
    getData();
  }, []);

  const navigateToAddDevice = () => {
    navigation.navigate(ConnectQR.name);
  };
  const navigateToDevice = () => {
    navigation.navigate(DeviceDetails.name);
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Text onPress={() => navigation.navigate(Account.name)}>settings </Text>
  //     ),
  //     headerLeft: () => (
  //       <HeaderBackButton onPress={() => navigation.navigate(SignIn.name)} />
  //     ),
  //   });
  // }, [navigation]);

  return (
    <Layout>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} />
      </Layout.Header>
      <Layout.Body>
        <SearchInput />
        <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <PillButton text={"All"} />
          </View>
          <View style={{ flex: 2 }}>
            <PillButton isSecondary text={"My chargers"} marginLeft={15} />
          </View>
          <View style={{ flex: 2 }}></View>
        </View>
        <ScrollView>
          <Card isCharging={true} navigateToDevice={navigateToDevice} />
          <Card isCharging={false} navigateToDevice={navigateToDevice} />

          <Card isCharging={false} navigateToDevice={navigateToDevice} />
          <Card isCharging={true} navigateToDevice={navigateToDevice} />
        </ScrollView>
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Add new charger"}
          marginTop={10}
          onPressAction={navigateToAddDevice}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
