import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import differenceInMinutes from "date-fns/differenceInMinutes";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { apiFactory } from "../../api";
import Button from "../../components/Button/Button";
import ChargerCard from "../../components/Card/ChargerCard";
import Label from "../../components/Input/Label";
import PillButton from "../../components/PillButton/PillButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import { getUniqueKey } from "../../helpers/checkers";
import routes from "../../routes";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";

import { HubConnectionState } from "@microsoft/signalr";
import {
  hourMinutesRenderer,
  kwhRenderer,
  priceRenderer,
} from "../../helpers/formatFunctions";
const Home = (props) => {
  const { navigation, route } = props;
  const {
    token,
    connectionStatus,
    userName,
    testareValentino,
    testareValentino2,
    testareValentino1,
  } = useContext(AuthContext);
  const { QRScannerStep, DeviceDetails } = routes;
  const [filterChargers, setFilterChargers] = useState(1);
  const [searchfield, setSearchfield] = useState("");
  const [chargerList, setChargerList] = useState(null);

  const navigateToAddDevice = () => {
    navigation.navigate(QRScannerStep.name);
  };

  const navigateToDeviceAction = (chargerId) => {
    navigation.navigate(DeviceDetails.name, {
      chargerId: chargerId,
    });
  };

  const filterChargersHandler = (isAdmin, isPrivate, isSearched) => {
    const isPublic = isAdmin === false && filterChargers === 0;
    const isAdminFiltered = isAdmin && filterChargers === 1;
    const isPrivateFiltered = isPrivate && filterChargers === 2;

    if (filterChargers === 0) {
      return isSearched && isPublic;
    } else if (filterChargers === 1) {
      return isSearched && isAdminFiltered;
    } else return isSearched && isPrivateFiltered;
  };

  const GetConnectedCharges = async (connection) => {
    if (connection.state == HubConnectionState.Connected) {
      //connection started
      await connection
        .invoke("GetConnectedCharges", false, null)
        .then((chargerList) => {
          setChargerList(chargerList);
        })
        .catch((err) => {
          console.log("THE ERROR IS", err);
        });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const connection = global.connection;
      GetConnectedCharges(connection);
    }, [connectionStatus])
  );

  return (
    <Layout diffuseBG={true}>
      <Layout.Header>
        <HeaderNavigator
          navigation={navigation}
          hideBack={true}
          route={route}
          userName={userName}
        />
      </Layout.Header>
      <Layout.Body>
        <Label white text="Search" />
        <SearchInput setSearchfield={setSearchfield} />
        <Label white text="Chargers" />
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <PillButton
            isSecondary={filterChargers !== 0}
            text={"Public"}
            onPressAction={() => setFilterChargers(0)}
          />
          <PillButton
            isSecondary={filterChargers !== 1}
            text={"My chargers"}
            marginLeft={15}
            onPressAction={() => setFilterChargers(1)}
          />
          {/* <PillButton
            isSecondary={filterChargers !== 2}
            text={'Private'}
            marginLeft={15}
            onPressAction={() => setFilterChargers(2)}
          /> */}
        </View>
        <View>
          <View style={{ marginTop: 10 }}>
            <Text>{JSON.stringify(testareValentino1)}</Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text>{JSON.stringify(testareValentino)}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text>{JSON.stringify(testareValentino2)}</Text>
          </View>
        </View>
        {/* <ScrollView>
          {chargerList &&
            chargerList.length > 0 &&
            chargerList
              .filter((charger) => {
                const isSearched = charger.name
                  .toLowerCase()
                  .includes(searchfield.toLowerCase());

                const filterHandler = filterChargersHandler(
                  charger.isAdmin,
                  // charger.isPrivate,
                  undefined,
                  isSearched
                );

                return filterHandler;
              })
              .map((item, index) => (
                <ChargerCard
                  name={item.name}
                  kwh={kwhRenderer(item.lastChargingSession)}
                  time={hourMinutesRenderer(item.lastChargingSession)}
                  price={priceRenderer(item.lastChargingSession)}
                  key={getUniqueKey(item)}
                  charger={item}
                  onClick={() => navigateToDeviceAction(item.chargerId)}
                />
              ))}
        </ScrollView> */}
      </Layout.Body>
      <Layout.Footer>
        <Button
          text={"Start Pairing"}
          marginTop={10}
          onPressAction={navigateToAddDevice}
        />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
