import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { style } from "./SearchInputStyle";

const SearchInput = ({ marginTop, marginBottom }) => {
  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <TextInput placeholder={"Search"} style={style.input} />
    </View>
  );
};

export default SearchInput;
