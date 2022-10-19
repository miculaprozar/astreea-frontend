import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { card } from "./ChargerSettingsCard.style";
import { useForm, Controller } from "react-hook-form";
import validationSchema from "./validationSchema";

const ChargerSettingsCard = ({ chargerId }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const connection = global.connection;
  const cert = global.cert;

  const updateChargerData = async (data) => {
    const chargerDetails = {
      name: data.name,
      chargerId: chargerId,
      address: data.address,
      price: Number(data.price),
      currency: data.currency,
    };

    try {
      await connection
        .invoke("UpdateChargerDetails", chargerDetails, cert)
        .then(() => {
          console.log("UpdateChargerDetails performed");
        });
    } catch (e) {
      console.log("The ERROR IS:", e);
    }
  };

  const onSubmit = (data) => updateChargerData(data);

  return (
    <View
      style={{
        ...card.wrapper,
        ...(Object.keys(errors).length > 0 && { height: 212 }),
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 4, marginRight: 20 }}>
          <Text style={card.label}>Name</Text>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={"Request"}
                  style={card.input}
                  onChangeText={onChange}
                />
              );
            }}
            name={"name"}
          />
          {errors?.name && (
            <Text style={card.errorText}>{errors.name?.message}</Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={card.label}>Currency</Text>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={"USD"}
                  textAlign={"center"}
                  style={card.input}
                  onChangeText={onChange}
                />
              );
            }}
            name={"currency"}
          />
          {errors?.currency && (
            <Text style={card.errorText}>{errors.currency?.message}</Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <View style={{ flex: 4, marginRight: 20 }}>
          <Text style={card.label}>Address</Text>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={"Request"}
                  style={card.input}
                  onChangeText={onChange}
                />
              );
            }}
            name={"address"}
          />
          {errors?.address && (
            <Text style={card.errorText}>{errors.address?.message}</Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={card.label}>Price</Text>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  placeholderTextColor="rgba(255, 255, 255, 0.9)"
                  placeholder={"USD"}
                  textAlign={"center"}
                  style={card.input}
                  onChangeText={onChange}
                />
              );
            }}
            name={"price"}
          />
          {errors?.price && (
            <Text style={card.errorText}>{errors.price?.message}</Text>
          )}
        </View>
      </View>
      <View style={card.buttonWrapper}>
        <Pressable>
          <Text style={card.buttonText}>Remove</Text>
        </Pressable>
        <Pressable onPress={handleSubmit(onSubmit)}>
          <Text style={card.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChargerSettingsCard;
