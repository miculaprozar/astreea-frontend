import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/Button/Button";
import HomeChargerCard from "../../components/ChargerCardV2/HomeChargerCard";

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
  const { token, connectionStatus, userName } = useContext(AuthContext);
  const { QRScannerStep, DeviceDetails } = routes;
  const [filterChargers, setFilterChargers] = useState(1);
  const [searchfield, setSearchfield] = useState("");
  const [chargerList, setChargerList] = useState(null);

  const navigateToAddDevice = () => {
    navigation.navigate(QRScannerStep.name);
  };

  const navigateToDeviceAction = (serialNumberCon) => {
    navigation.navigate(DeviceDetails.name, {
      serialNumberCon: serialNumberCon,
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
    <>
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
          <ScrollView>
            <SearchInput setSearchfield={setSearchfield} />
            {chargerList &&
              chargerList.length > 0 &&
              chargerList
                .filter((charger) => {
                  const isSearched = charger.name
                    .toLowerCase()
                    .includes(searchfield.toLowerCase());

                  return isSearched;
                })
                .map((item, index) => {
                  return (
                    <HomeChargerCard
                      key={item.serialNumberCon}
                      charger={item}
                      onClick={() =>
                        navigateToDeviceAction(item.serialNumberCon)
                      }
                    />
                  );
                })}
          </ScrollView>
        </Layout.Body>
      </Layout>
    </>
  );
};

export default Home;
