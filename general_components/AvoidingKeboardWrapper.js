import React, { useState, useEffect } from "react";
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	ScrollView,
	Keyboard,
} from "react-native";
const AvoidingKeyboardWrapper = ({ children, scrollView }) => {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: "#F2F6F7" }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			{scrollView ? (
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						{children}
					</TouchableWithoutFeedback>
				</ScrollView>
			) : (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{children}
				</TouchableWithoutFeedback>
			)}
		</KeyboardAvoidingView>
	);
};

export default AvoidingKeyboardWrapper;
