import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import DetailsBackground from "../../assets/chargingScreen.jpg";
import Layout from "../../general_components/Layout";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import { style } from "./Schedule.style";
import DoubleInput from "../../components/DoubleInput/DoubleInput";
import SmallInput from "../../components/SmallInput/SmallInput";

import PillButton from "../../components/PillButton/PillButton";
import { useForm } from "react-hook-form";
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

  const onSubmit = (data) => console.log(data);

  return (
    <Layout customBackgroundUrl={DetailsBackground}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} route={route} />
        <Text style={style.title}>Schedule</Text>
      </Layout.Header>
      <Layout.Body>
        <View
          style={{
            ...style.inputsCard,
            ...(Object.keys(errors).length === 0 && { height: 150 }),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <DoubleInput
              control={control}
              firstInputName={"startHour"}
              secondInputName={"startMinutes"}
              label={"Start"}
              firstInputPlaceholder={`Hour`}
              secondInputPlaceholder={"Minutes"}
              firstInputError={errors?.startHour ? errors.startHour : null}
              secondInputError={
                errors?.startMinutes ? errors.startMinutes : null
              }
            />
            <DoubleInput
              control={control}
              firstInputName={"stopHour"}
              secondInputName={"stopMinutes"}
              label={"Stop"}
              firstInputPlaceholder={`Hour`}
              secondInputPlaceholder={"Minutes"}
              marginLeft={"auto"}
              firstInputError={errors?.stopHour ? errors.stopHour : null}
              secondInputError={errors?.stopMinutes ? errors.stopMinutes : null}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <SmallInput
              control={control}
              label={"Watts"}
              name={"watts"}
              error={errors?.watts}
            />

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
              <Text>Stop</Text>
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
          <ScrollView>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
                  <PillButton
                    text={"Delete"}
                    isDanger={true}
                    onPressAction={() => console.log("presed")}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 5,
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
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </Layout.Body>
    </Layout>
  );
};

export default Schedule;
