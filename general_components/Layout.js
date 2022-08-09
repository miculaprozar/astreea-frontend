import React from "react";
import { ImageBackground, View } from "react-native";

import { style } from "./Layout.style";

import AvoidingKeyboardWrapper from "./AvoidingKeboardWrapper";

const Layout = ({
  children,
  scrollView,
  customLayoutStyle,
  customBackgroundUrl,
  diffuseBG = false,
}) => {
  const innerView = (
    <View
      style={{
        ...style.layout_container,
        ...(diffuseBG && { backgroundColor: "#949597" }),
      }}
    >
      {children}
    </View>
  );

  return (
    <AvoidingKeyboardWrapper scrollView={scrollView}>
      <View
        style={{
          ...style.device_container,
          ...(diffuseBG && { backgroundColor: "#949597" }),
          ...customLayoutStyle,
        }}
      >
        {customBackgroundUrl ? (
          <ImageBackground
            source={customBackgroundUrl}
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {innerView}
          </ImageBackground>
        ) : (
          innerView
        )}
      </View>
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
