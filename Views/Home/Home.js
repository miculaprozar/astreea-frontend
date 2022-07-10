import React from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import PillButton from "../../components/PillButton/PillButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import HeaderBackButton from "../../general_components/HeaderBackButton";
import Layout from "../../general_components/Layout";
import { ConnectQR, DeviceDetails, Account, SignIn } from "../../routes";

const Home = (props) => {
	const { navigation } = props;

	const navigateToAddDevice = () => {
		navigation.navigate(ConnectQR.name);
	};
	const navigateToDevice = () => {
		console.log("LOGG!, home");
		navigation.navigate(DeviceDetails.name);
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Text onPress={() => navigation.navigate(Account.name)}>settings </Text>
			),
			headerLeft: () => (
				<HeaderBackButton onPress={() => navigation.navigate(SignIn.name)} />
			),
		});
	}, [navigation]);

	return (
		<Layout>
			<Layout.Header>
				<SearchInput />
				<View style={{ flexDirection: "row", paddingTop: 10 }}>
					<View style={{ flex: 1 }}>
						<PillButton text={"All"} />
					</View>
					<View style={{ flex: 2 }}>
						<PillButton isSecondary text={"My chargers"} marginLeft={15} />
					</View>
					<View style={{ flex: 2 }}></View>
				</View>
			</Layout.Header>
			<Layout.Body>
				<ScrollView>
					<Card isCharging={true} navigateToDevice={navigateToDevice} />
					<Card isCharging={false} navigateToDevice={navigateToDevice} />

					<Card isCharging={false} navigateToDevice={navigateToDevice} />
					<Card isCharging={true} navigateToDevice={navigateToDevice} />
				</ScrollView>
			</Layout.Body>
			<Layout.Footer>
				<Button
					text={"Add new charger"}
					marginTop={10}
					onPressAction={navigateToAddDevice}
				/>
			</Layout.Footer>
		</Layout>
	);
};

export default Home;
