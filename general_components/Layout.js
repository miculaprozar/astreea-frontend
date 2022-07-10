import React from "react";
import { View } from "react-native";

import { style } from "./Layout.style";

import AvoidingKeyboardWrapper from "./AvoidingKeboardWrapper";

const Layout = ({ children, scrollView }) => {
	return (
		<AvoidingKeyboardWrapper scrollView={scrollView}>
			<View style={style.layout_container}>{children}</View>
		</AvoidingKeyboardWrapper>
	);
};

const Body = ({ children, content }) => {
	return (
		<View style={{ ...style.body, justifyContent: content }}>{children}</View>
	);
};
const Header = ({ children }) => {
	return <View style={style.header}>{children}</View>;
};
const Footer = ({ children }) => {
	return <View style={style.footer}>{children}</View>;
};

Layout.Body = Body;
Layout.Header = Header;
Layout.Footer = Footer;

export default Layout;
