import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { style } from "./SearchInput.style";

const SearchInput = () => {
	return <TextInput placeholder={"Search"} style={style.input} />;
};

export default SearchInput;
