import React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import HeaderBackButton from "../../general_components/HeaderBackButton";

import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout";
import { style } from "./ConnectDevice.style";
import { ConnectQR, SetupDevice } from "../../routes";

const ConnectDevice = (props) => {
	const { navigation } = props;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<HeaderBackButton onPress={() => navigation.navigate(ConnectQR.name)} />
			),
		});
	}, [navigation]);

	const navigateToSetup = () => {
		navigation.navigate(SetupDevice.name);
	};

	return (
		<Layout>
			<View style={{ flex: 0.5 }}>
				<Text style={style.title}>Connect to Device</Text>
			</View>
			<View style={{ flex: 10 }}>
				<Input
					label={"Hotspot name"}
					marginBottom={15}
					marginTop={15}
					disabled
				/>
				<Input disabled label={"Password"} marginBottom={15} />
				<Text style={style.description}>
					Connect with your phone to the device hotspot
				</Text>
			</View>
			<View style={{ flex: 0.5 }}>
				<Button
					text={"Test connection"}
					marginTop={10}
					marginBottom={35}
					onPressAction={navigateToSetup}
				/>
			</View>
		</Layout>
	);
};

export default ConnectDevice;
