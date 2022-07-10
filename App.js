import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Account from "./Views/Account/Account";
import ConnectQR from "./Views/ConnectQR/ConnectQR";
import ChargerSettings from "./Views/ChargerSettings/ChargerSettings";
import ConnectDevice from "./Views/ConnectDevice/ConnectDevice";
import DeviceDetails from "./Views/DeviceDetails/DeviceDetails";
import SetupDevice from "./Views/SetupDevice/SetupDevice";
import Home from "./Views/Home/Home";

import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";

import routes from "./routes";

import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import Websocket from "./Views/WebSocket/Websocket";

const Stack = createNativeStackNavigator();

export default function App() {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
		Inter_600SemiBold,
	});
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='SignIn'>
					{/* <Stack.Screen
						name='Websocket'
						options={{
							title: "astreea",
							headerStyle: {
								backgroundColor: "#F2F6F7",
							},

							headerShadowVisible: false,
							headerTintColor: "#393B3B",
						}}>
						{(props) =>
							fontsLoaded ? (
								<Websocket {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen> */}
					<Stack.Screen
						name={routes.SignIn.name}
						options={routes.SignIn.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<SignIn {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.SignUp.name}
						options={routes.SignUp.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<SignUp {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.Home.name}
						options={routes.Home.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<Home {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.Account.name}
						options={routes.Account.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<Account {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.ConnectQR.name}
						options={routes.ConnectQR.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<ConnectQR {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.ConnectDevice.name}
						options={routes.ConnectDevice.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<ConnectDevice {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.SetupDevice.name}
						options={routes.SetupDevice.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<SetupDevice {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.DeviceDetails.name}
						options={routes.DeviceDetails.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<DeviceDetails {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
					<Stack.Screen
						name={routes.ChargerSettings.name}
						options={routes.ChargerSettings.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<ChargerSettings {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
