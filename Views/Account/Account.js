import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import HeaderBackButton from "../../general_components/HeaderBackButton";
import Input from "../../components/Input/Input";
import Layout from "../../general_components/Layout";
import { style } from "./Account.style";
import validationSchema from "./validationSchema";
import { routes } from "../../routes";

const Account = (props) => {
	const { navigation } = props;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<HeaderBackButton
					onPress={() => navigation.navigate(routes.SignIn.name)}
				/>
			),
		});
	}, [navigation]);

	const navigateToSignIn = () => {
		navigation.navigate(routes.SignIn.name);
	};
	// const onSubmit = async (data) => {
	//   try {
	//     const login = await apiFactory()
	//       .data.account()
	//       .register({
	//         ...data,
	//         password: data.passwordControlled,
	//       });
	//     console.log("THE LOGIN DATA:", login);
	//     navigation.navigate("Home");
	//   } catch (e) {
	//     console.log("the e is ", e);
	//   }
	// };

	const onSubmit = (data) => console.log(data);

	return (
		<Layout>
			<View style={{ flex: 0.5 }}>
				<Text style={style.title}>My account</Text>
			</View>
			<View style={{ flex: 10 }}>
				<Input
					label={"Email"}
					marginBottom={15}
					validateInput={true}
					control={control}
					errors={errors.email?.message}
					name={"email"}
					secureTextEntry={false}
				/>
				<Input
					label={"First name"}
					marginBottom={12}
					validateInput={true}
					control={control}
					errors={errors.firstName?.message}
					name={"firstName"}
					secureTextEntry={false}
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
				<Input
					label={"Password"}
					marginBottom={12}
					validateInput={true}
					control={control}
					errors={errors.passwordControlled?.message}
					name={"passwordControlled"}
					secureTextEntry={true}
				/>
				<Input
					label={"Confirm password"}
					marginBottom={20}
					validateInput={true}
					control={control}
					errors={errors.seccondPasswordControlled?.message}
					name={"seccondPasswordControlled"}
					secureTextEntry={true}
				/>
			</View>
			<View style={{ flex: 0.5 }}>
				<Button
					isSecondary
					text={"Log out"}
					marginTop={10}
					marginBottom={15}
					onPressAction={navigateToSignIn}
				/>
				<Button
					text={"Save settings"}
					marginTop={10}
					marginBottom={35}
					onPressAction={handleSubmit(onSubmit)}
				/>
			</View>
		</Layout>
	);
};

export default Account;
