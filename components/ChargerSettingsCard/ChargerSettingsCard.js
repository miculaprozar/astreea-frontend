import React, { useEffect, useState } from "react";

import {
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { card } from "./ChargerSettingsCard.style";

const ChargerSettingsCard = () => {
  return (
    <View
      style={{
        ...card.wrapper,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 4, marginRight: 20 }}>
          <Text style={card.label}>Name</Text>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            placeholder={"Request"}
            style={card.input}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={card.label}>Card</Text>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            placeholder={"USD"}
            textAlign={"center"}
            style={card.input}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <View style={{ flex: 4, marginRight: 20 }}>
          <Text style={card.label}>Address</Text>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            placeholder={"Request"}
            style={card.input}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={card.label}>Price</Text>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            placeholder={"USD"}
            textAlign={"center"}
            style={card.input}
          />
        </View>
      </View>
      <View style={card.buttonWrapper}>
        <Pressable>
          <Text style={card.buttonText}>Remove</Text>
        </Pressable>
        <Pressable>
          <Text style={card.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChargerSettingsCard;
