import React from 'react';
import {ImageBackground, View} from 'react-native';

import {style} from './Layout.style';

import AvoidingKeyboardWrapper from './AvoidingKeboardWrapper';

const Layout = ({
  children,
  scrollView,
  customLayoutStyle,
  customBackgroundUrl,
}) => {
  console.log(Array.isArray(children));
  return (
    <AvoidingKeyboardWrapper scrollView={scrollView}>
      <View
        style={{
          ...style.layout_container,
          ...customLayoutStyle,
        }}
      >
        {/* {customBackgroundUrl ? (
          <ImageBackground
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 15,
              paddingBottom: 15,
            }}
            source={customBackgroundUrl}
          >
            {children}
          </ImageBackground>
        ) : (
          {children}
        )} */}
        {children}
      </View>
    </AvoidingKeyboardWrapper>
  );
};

const Body = ({children, content}) => {
  return (
    <View style={{...style.body, justifyContent: content}}>{children}</View>
  );
};
const Header = ({children}) => {
  return <View style={style.header}>{children}</View>;
};
const Footer = ({children}) => {
  return <View style={style.footer}>{children}</View>;
};

Layout.Body = Body;
Layout.Header = Header;
Layout.Footer = Footer;

export default Layout;
