import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TextInput } from "react-native";
import Account from "./Views/Account/Account";
import ConnectQR from "./Views/ConnectQR/ConnectQR";
import ChargerSettings from "./Views/ChargerSettings/ChargerSettings";
import ConnectDevice from "./Views/ConnectDevice/ConnectDevice";
import DeviceDetails from "./Views/DeviceDetails/DeviceDetails";
import SetupDevice from "./Views/SetupDevice/SetupDevice";
import Home from "./Views/Home/Home";
import ForgotPassword from "./Views/ForgotPassword/ForgotPassword";
import RessetPassword from "./Views/RessetPassword/RessetPassword";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";
import Permision from "./Views/Permision/Permision";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import base64 from "react-native-base64";
import startSignalRConnection from "./startSignalRConnection";
import {
	ADB2C_TENANT,
	ADB2C_POLICY,
	ADB2C_CLIENT,
	ADB2C_REDIRECT_URI,
	ADB2C_POLICY_EDIT_PROFILE,
	ADB2C_POLICY_PASSWORD_RESET,
} from "./api/utils/consts.js";
import axios from "axios";
import routes from "./routes";
import { AuthProvider } from "./components/AuthWrapper/AuthProvider";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";

Text.defaultProps = {
	...(Text.defaultProps || {}),
	allowFontScaling: false,
};
TextInput.defaultProps = {
	...(TextInput.defaultProps || {}),
	allowFontScaling: false,
};
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import Websocket from "./Views/WebSocket/Websocket";
import { RouteGuard } from "./components/AuthWrapper/RouteGuarding";

import { Provider } from "./provider/Provider";

const Stack = createNativeStackNavigator();
export default function App() {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
		Inter_600SemiBold,
	});

	startSignalRConnection();

	// const getSearchParamFromURL = (url, param) => {
	// 	const include = url.includes(param);

	// 	if (!include) return null;

	// 	const params = url.split(/([?,=])/);
	// 	const index = params.indexOf(param);
	// 	const value = params[index + 2];
	// 	return value;
	// };

	// const getCodeAuth = async () => {
	// 	let codeResponse = await WebBrowser.openAuthSessionAsync(
	// 		`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`,
	// 		ADB2C_REDIRECT_URI
	// 	); // sign-in & sign-up
	// 	let code = getSearchParamFromURL(codeResponse.url, "code");
	// 	let tokenResponse = await axios.post(
	// 		`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/token?grant_type=authorization_code&client_id=${ADB2C_CLIENT}&code=${code}&claim=given_name&claim=family_name&claim=idp_access_token`
	// 	); // get token
	// 	tokenResponse.data.id_token;
	// 	base64.decode(tokenResponse.data.profile_info);
	// 	//await WebBrowser.openAuthSessionAsync(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY_EDIT_PROFILE}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`, ADB2C_REDIRECT_URI);  //edit profile
	// 	//await WebBrowser.openAuthSessionAsync(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/logout?post_logout_redirect_uri=${ADB2C_REDIRECT_URI}`, ADB2C_REDIRECT_URI); // logout
	// 	//await WebBrowser.openAuthSessionAsync(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY_PASSWORD_RESET}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`, ADB2C_REDIRECT_URI); // reset password
	// };

	// useEffect(() => {
	// 	//getCodeAuth(); //uncomment this if you want to trigger adb2c
	// });

	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Home'>
					{/* <Stack.Screen
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
						name={routes.ForgotPassword.name}
						options={routes.ForgotPassword.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<ForgotPassword {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen> */}
					{/* <Stack.Screen
						name={routes.AuthWrapper.name}
						options={routes.AuthWrapper.navigationOptions}>
						{(props) =>
							fontsLoaded ? <AuthWrapper {...props} /> : <Text>Loading...</Text>
						}
					</Stack.Screen> */}
					{/* <Stack.Screen
						name={routes.RessetPassword.name}
						options={routes.RessetPassword.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<RessetPassword {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen> */}
					{/* <Stack.Screen
						name={routes.SignUp.name}
						options={routes.SignUp.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<SignUp {...props} extraData={"bla"} />
							) : (
								<Text>Loading...</Text>
							)
						}
					</Stack.Screen> */}
					<Stack.Screen
						name={routes.Home.name}
						options={routes.Home.navigationOptions}>
						{(props) =>
							fontsLoaded ? (
								<RouteGuard>
									<Home {...props} />
								</RouteGuard>
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
								<RouteGuard>
									<Account {...props} />
								</RouteGuard>
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
					<Stack.Screen
						name={routes.Permision.name}
						options={routes.Permision.navigationOptions}>
						{(props) =>
							fontsLoaded ? <Permision {...props} /> : <Text>Loading...</Text>
						}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
