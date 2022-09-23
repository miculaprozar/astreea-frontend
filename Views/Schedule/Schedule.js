import React, { useEffect, useState, useContext } from "react";
import { Image, Pressable, Text, View, TextInput } from "react-native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { style } from "./Schedule.style";
import Input from "../../components/Input/Input";

const Schedule = (props) => {
  const { navigation, route } = props;

  return (
    <Layout customBackgroundUrl={DetailsBackground}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
        <Text style={style.title}>Schedule</Text>
      </Layout.Header>
      <Layout.Body>
        <View style={style.inputsCard}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center" }}>
              <Text>Stop</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={`Hour`}
                  style={{
                    ...style.input,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderRightColor: "rgba(255, 255, 255, 0.9)",
                  }}
                />
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={`Minutes`}
                  style={{
                    ...style.input,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderLeftColor: "rgba(255, 255, 255, 0.9)",
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginLeft: "auto" }}>
              <Text>Duration</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={`Hour`}
                  style={{
                    ...style.input,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderRightColor: "rgba(255, 255, 255, 0.9)",
                  }}
                />
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={`Minutes`}
                  style={{
                    ...style.input,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderLeftColor: "rgba(255, 255, 255, 0.9)",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center" }}>
              <Text>Stop</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={`Hour`}
                  style={{
                    ...style.input,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderRightColor: "rgba(255, 255, 255, 0.9)",
                  }}
                />
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={`Minutes`}
                  style={{
                    ...style.input,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderLeftColor: "rgba(255, 255, 255, 0.9)",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Layout.Body>
    </Layout>
  );
};

export default Schedule;
