import React from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { style } from "./ChargingHistoryTable.style";
let deleteIcon = require("../../assets/delete.png");

import {
  getChargingTime,
  getStart,
  getStop,
} from "../../helpers/formatFunctions";

const ChargingHistoryTable = (props) => {
  const { chargerProfiles, deleteScheduleHandler } = props;

  return (
    <View>
      {chargerProfiles ? (
        <>
          <Text style={style.title}>History</Text>
          <View style={style.scheduleTableCard}>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: "#FFFFFF",
                  height: 25,
                }}
              >
                <Text style={style.headerText}>Start</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                ></View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: "#FFFFFF",
                }}
              >
                <Text style={style.headerText}>Stop</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                ></View>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: "#FFFFFF",
                }}
              >
                <Text style={style.headerText}>Kwh</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                ></View>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: "#FFFFFF",
                }}
              >
                <Text style={style.headerText}>Charging Time</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                ></View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={style.headerText}>Delete</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                ></View>
              </View>
            </View>
            {chargerProfiles.map(
              ({
                chargingProfileId,
                chargingSchedule: {
                  startSchedule,
                  chargingSchedulePeriod,
                  duration,
                },
              }) => (
                <View
                  key={chargingProfileId}
                  style={{ flexDirection: "row", marginBottom: 5 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={style.lefDoubleWrapper}>
                      <Text style={style.tableTextData}>
                        {getStart(
                          startSchedule,
                          chargingSchedulePeriod[0].startPeriod,
                          "hours"
                        )}
                      </Text>
                    </View>
                    <View style={style.rightDoubleWrapper}>
                      <Text style={style.tableTextData}>
                        {getStart(
                          startSchedule,
                          chargingSchedulePeriod[0].startPeriod,
                          "minutes"
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={style.lefDoubleWrapper}>
                      <Text style={style.tableTextData}>
                        {getStop(
                          startSchedule,
                          duration,
                          chargingSchedulePeriod[0].startPeriod,
                          "hours"
                        )}
                      </Text>
                    </View>
                    <View style={style.rightDoubleWrapper}>
                      <Text style={style.tableTextData}>
                        {getStop(
                          startSchedule,
                          duration,
                          chargingSchedulePeriod[0].startPeriod,
                          "minutes"
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={style.entireWrapper}>
                      <Text style={style.tableTextData}>
                        {chargingSchedulePeriod[0].limit}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        ...style.lefDoubleWrapper,
                        backgroundColor: "#484848",
                      }}
                    >
                      <Text style={style.tableTextData}>
                        {getChargingTime(
                          startSchedule,
                          duration,
                          chargingSchedulePeriod[0].startPeriod,
                          "hours"
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...style.rightDoubleWrapper,
                        backgroundColor: "#484848",
                      }}
                    >
                      <Text style={style.tableTextData}>
                        {getChargingTime(
                          startSchedule,
                          duration,
                          chargingSchedulePeriod[0].startPeriod,
                          "minutes"
                        )}
                      </Text>
                    </View>
                  </View>
                  <TouchableWithoutFeedback
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                    onPress={() => deleteScheduleHandler(chargingProfileId)}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <View style={{}}>
                        <Image
                          source={deleteIcon}
                          style={{
                            width: 18,
                            height: 18,
                            resizeMode: "contain",
                            marginTop: 2,
                          }}
                        ></Image>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
            )}
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ChargingHistoryTable;
