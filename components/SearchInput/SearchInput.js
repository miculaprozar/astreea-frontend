import React, { useState } from "react";
import { TextInput, View, Image } from "react-native";
import { style } from "./SearchInput.style";

const SearchInput = ({ setSearchfield }) => {
  return (
    <View style={style.wrapper}>
      <TextInput
        placeholder={"Search"}
        style={style.input}
        onChangeText={(text) => setSearchfield(text)}
      ></TextInput>
      <Image style={style.image} source={require("../../assets/search.png")} />
    </View>
  );
};

export default SearchInput;
