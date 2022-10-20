import React from "react";
import { TextInput, View, Image } from "react-native";
import { style } from "./SearchInput.style";

const SearchInput = ({ setSearchfield }) => (
  <View style={style.wrapper}>
    <TextInput
      placeholderTextColor={"#DDDDDD"}
      placeholder={"Search"}
      style={style.input}
      onChangeText={(text) => setSearchfield(text)}
    />
    <Image
      style={style.image}
      source={require("../../assets/search-white.png")}
    />
  </View>
);

export default SearchInput;
