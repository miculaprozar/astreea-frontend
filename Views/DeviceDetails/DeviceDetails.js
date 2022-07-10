import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import { style } from "./DeviceDetails.style";

import Layout from "../../general_components/Layout";
const DeviceDetails = () => {
	//   const navigateToSignUp = () => {
	//     navigation.navigate("SignUp");
	//   };
	//   const navigateToHome = () => {
	//     navigation.navigate("Home");
	//   };

	return (
		<Layout>
			<Text> Some text</Text>
			<View style={style.lastButtonContainer}>
				<Button text={"Add new charger"} />
			</View>
		</Layout>
	);
};

export default DeviceDetails;
