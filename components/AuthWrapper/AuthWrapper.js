import React, { useState, useEffect, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import base64 from "react-native-base64";
import axios from "axios";
import {
	ADB2C_TENANT,
	ADB2C_POLICY,
	ADB2C_CLIENT,
	ADB2C_REDIRECT_URI,
	ADB2C_POLICY_EDIT_PROFILE,
	ADB2C_POLICY_PASSWORD_RESET,
} from "../../api/utils/consts.js";
import { Text, View, Pressable, Image } from "react-native";
import Loader from "../../general_components/Loader/Loader.js";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider.js";

const AuthWrapper = () => {
	const { setToken } = useContext(AuthContext);

	const getCodeAuth = async () => {
		let codeResponse = await WebBrowser.openAuthSessionAsync(
			`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`,
			ADB2C_REDIRECT_URI
		); // sign-in & sign-up
		let code = getSearchParamFromURL(codeResponse.url, "code");
		let tokenResponse = await axios.post(
			`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/token?grant_type=authorization_code&client_id=${ADB2C_CLIENT}&code=${code}&claim=given_name&claim=family_name&claim=idp_access_token`
		); // get token
		base64.decode(tokenResponse.data.profile_info);
		// AsyncStorage.setItem('tokenADB2C', tokenResponse.data);
		console.log("TOKEN", tokenResponse.data);
		setToken(tokenResponse.data.id_token);

		//await WebBrowser.openAuthSessionAsync(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY_EDIT_PROFILE}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`, ADB2C_REDIRECT_URI);  //edit profile
		//await WebBrowser.openAuthSessionAsync(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY}/oauth2/v2.0/logout?post_logout_redirect_uri=${ADB2C_REDIRECT_URI}`, ADB2C_REDIRECT_URI); // logout
		//await WebBrowser.openAuthSessionAsync(`https://${ADB2C_TENANT}.b2clogin.com/${ADB2C_TENANT}.onmicrosoft.com/${ADB2C_POLICY_PASSWORD_RESET}/oauth2/v2.0/authorize?client_id=${ADB2C_CLIENT}&response_type=code+id_token&redirect_uri=${ADB2C_REDIRECT_URI}&response_mode=query&scope=openid`, ADB2C_REDIRECT_URI); // reset password
	};

	// useEffect(() => {
	// 	getCodeAuth(); //uncomment this if you want to trigger adb2c
	// });
	return (
		<View>
			<Loader isLoading={true} />
		</View>
	);
};

export default AuthWrapper;
