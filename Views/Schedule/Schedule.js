import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { style } from "./Schedule.style";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import PillButton from "../../components/PillButton/PillButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validationSchema";

const Schedule = (props) => {
  const { navigation, route } = props;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log("THE ERRORS ARE:", errors);

  const onSubmit = (data) => console.log(data);

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
                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextInput
                        placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        placeholder={`Hour`}
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        style={{
                          ...style.input,
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                          borderRightColor: "rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    );
                  }}
                  name={"stopHour"}
                />
                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextInput
                        placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        placeholder={`Minutes`}
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        style={{
                          ...style.input,
                          borderTopRightRadius: 20,
                          borderBottomRightRadius: 20,
                          borderLeftColor: "rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    );
                  }}
                  name={"stopMinutes"}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginLeft: "auto" }}>
              <Text>Duration</Text>
              <View style={{ flexDirection: "row" }}>
                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextInput
                        placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        placeholder={`Hour`}
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        style={{
                          ...style.input,
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                          borderRightColor: "rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    );
                  }}
                  name={"durationHour"}
                />

                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextInput
                        placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        placeholder={`Minutes`}
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        style={{
                          ...style.input,
                          borderTopRightRadius: 20,
                          borderBottomRightRadius: 20,
                          borderLeftColor: "rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    );
                  }}
                  name={"durationMinutes"}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Watts</Text>
              <View style={{ flexDirection: "row" }}>
                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextInput
                        placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        placeholder={`Watts`}
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        style={{
                          ...style.input,
                          borderRadius: 20,
                          borderRightColor: "rgba(255, 255, 255, 0.9)",
                          width: 140,
                        }}
                      />
                    );
                  }}
                  name={"kwh"}
                />
              </View>
            </View>
            <View
              style={{ marginLeft: "auto", marginTop: 20, marginRight: "auto" }}
            >
              <PillButton
                text={"+ Add"}
                // marginTop={10}
                onPressAction={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
        <View style={style.scheduleTableCard}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text>Start</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text>Stop</Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text>Duration</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text>Kwh</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>Delete</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>8 : 48</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>9 : 48</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>1 : 00</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>23</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <PillButton text={"Delete"} isDanger={true} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Layout.Body>
    </Layout>
  );
};

export default Schedule;
