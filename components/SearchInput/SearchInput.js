import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { style } from "./SearchInput.style";

const SearchInput = ({ setSearchfield }) => {
  return (
    <TextInput
      placeholder={"Search"}
      style={style.input}
      onChangeText={(text) => setSearchfield(text)}
    />
  );
};

export default SearchInput;
