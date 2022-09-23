import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, Text } from "react-native";
import { apiFactory } from "../../api/index.js";
import {
	ADB2C_POLICY,
	ADB2C_REDIRECT_URI,
	ADB2C_TENANT,
} from "../../api/utils/consts";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import HeaderNavigator from "../../general_components/HeaderNavigator/HeaderNavigator";
import Layout from "../../general_components/Layout";
import SnackBar from "../../general_components/SnackBar";
import { AuthContext } from "../../components/AuthWrapper/AuthProvider";
import { style } from "./Account.style";
import validationSchema from "./validationSchema";

const Account = (props) => {
	const { initLogOut, initEditProfile, initResetPassword, userName } = useContext(AuthContext);

	const [error, setError] = useState(false);
	const [logType, setLogType] = useState("error");

	const [email, setEmail] = useState("");

	const { navigation, route } = props;

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const populateUserData = async () => {
		try {
			const firstName = await AsyncStorage.getItem("firstName");
			const lastName = await AsyncStorage.getItem("lastName");
			const email = await AsyncStorage.getItem("email");
			setEmail(email);
			setValue("firstName", firstName);
			setValue("lastName", lastName);
		} catch (e) {
			console.log("Error getting firstName, lastName:", e);
			// error reading value
		}
	};

	useEffect(() => {
		populateUserData();
	}, []);

	const triggerLogOutFlow = async () => {
		initLogOut();
	};

	const onSubmit = async (data) => {
		try {
			const resp = await apiFactory().data.account().changePassword(token, {
				firstName: data.firstName,
				lastName: data.lastName,
			});
			AsyncStorage.setItem("firstName", resp[0].firstName);
			AsyncStorage.setItem("lastName", resp[0].lastName);
			setLogType("info");
			setError("Successfully updated your profile");
		} catch (e) {
			console.log("the e is ", e.message);
			setLogType("error");
			setError("Error in user details!");
		}
	};

	const handleEditProfile = () => {
		initEditProfile();
	};

	const handleResetPassword = () => {
		initResetPassword();
	};

	return (
		<Layout scrollView={true}>
			<Layout.Header>
				<HeaderNavigator
					navigation={navigation}
					hideAccountSettings={true}
					route={route}
				/>
			</Layout.Header>
			<Layout.Body>
				<Image
					style={style.image}
					source={require("../../assets/myAccount.png")}
				/>
				<Text style={style.changeText}>My Account</Text>
				<Text style={style.title}>{userName}</Text>



				{/* <Input
					disabled={true}
					label={"Email"}
					marginBottom={12}
					name={"firstName"}
					secureTextEntry={false}
					value={email}
					autoCapitalize={"none"}
					keyboardType={"email-address"}
				/>
				<Input
					label={"First name"}
					marginBottom={12}
					validateInput={true}
					control={control}
					errors={errors.firstName?.message}
					name={"firstName"}
					secureTextEntry={false}
					value={"abc"}
				/>
				<Input
					label={"Last name"}
					marginBottom={12}
					validateInput={true}
					control={control}
					errors={errors.lastName?.message}
					name={"lastName"}
					secureTextEntry={false}
				/>
				<Pressable onPress={() => navigation.navigate("RessetPassword")}>
					<Text style={style.buttonsText}>Change Password</Text>
				</Pressable> */}
				<Button
					text={"Edit profile"}
					marginBottom={20}
					onPressAction={handleEditProfile}
					fill={true}
				/>
				<Button
					text={"Reset Password"}
					marginBottom={20}
					onPressAction={handleResetPassword}
					fill={true}
				/>
				<Button
					isSecondary
					text={"LOG OUT"}
					marginBottom={15}
					marginTop={30}
					onPressAction={triggerLogOutFlow}
					fill={true}
				/>

				{error && (
					<SnackBar
						text={error}
						logSnackbar={error}
						setLogSnackbar={setError}
						logType={logType}
					/>
				)}
			</Layout.Body>
			<Layout.Footer>

			</Layout.Footer>
		</Layout>
	);
};

export default Account;
