import React from "react";

import { Image, Text, View } from "react-native";
import { chargeDate, chargeLastUsed } from "../../helpers/formatFunctions";
import { style } from "./DetailsCard.style";

const DetailsCard = ({ name, price, kwh, time, charger }) => {
  return (
    <>
      <View
        style={{
          ...style.wrapper,
        }}
      >
        <View style={style.upperTextContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={style.image}
              source={require("../../assets/greenLighting.png")}
            />

            <Text style={[style.locationText]}>{name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                ...style.chargingStatusText,
              }}
            >
              {charger.state}
            </Text>
            <View
              style={{
                ...style.circle,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
        <View style={style.lastUsedWrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                ...style.circle,
                marginRight: 10,
              }}
            />

            <Text style={[style.locationText]}>{chargeLastUsed(charger)}</Text>
          </View>

          <Text
            style={{
              ...style.chargingStatusText,
            }}
          >
            {chargeDate(charger)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, marginTop: "auto" }}>
            <Text
              style={{
                ...style.smallText,
              }}
            >
              Energy Delivered
            </Text>

            <Text
              style={{
                ...style.chargingValuesText,
              }}
            >
              {kwh}
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: "auto" }}>
            <Text
              style={{
                ...style.smallText,
              }}
            >
              Charge Duration
            </Text>
            <Text
              style={{
                ...style.chargingValuesText,
              }}
            >
              {time}
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: "auto" }}>
            <Text
              style={{
                ...style.smallText,
              }}
            >
              Amount Paid
            </Text>
            <Text
              style={{
                ...style.chargingValuesText,
              }}
            >
              {price}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DetailsCard;
