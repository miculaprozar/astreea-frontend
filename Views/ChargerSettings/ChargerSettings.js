import React from "react";
import { Text, View } from "react-native";
import Input from "../../components/Input/Input";
import PillButton from "../../components/PillButton/PillButton";
import { style } from "./ChargerSettings.style";
import Layout from "../../general_components/Layout";

const ChargerSettings = () => {
	return (
		<Layout>
			<View style={{ flex: 1 }}>
				<Input label={"Charger name"} marginBottom={15} marginTop={15} />
				<View style={style.textAndPillsContainer}>
					<Text>curency</Text>
					<PillButton text={"All"} />
				</View>
				<View style={style.textAndPillsContainer}>
					<Text>curency</Text>
					<PillButton text={"All"} />
				</View>
			</View>
			<View style={{ flex: 1 }}></View>

			<View style={{ flex: 1 }}></View>
		</Layout>
	);
};

export default ChargerSettings;
