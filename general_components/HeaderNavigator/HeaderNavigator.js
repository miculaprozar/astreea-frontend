import React from "react";
import { View } from "react-native";
import { style } from "./HeaderNavigator.style";
import GoBack from "./GoBack";
import AccountSettings from "./AccountSettings";

const HeaderNavigator = ({
  navigation,
  hideLogo,
  hideAccountSettings,
  hideBack,
  navProps,
  route,
  userName
}) => {
  return (
    <View style={style.headerContainer}>
      <View style={{ flex: 1 }}>
        <GoBack navigation={navigation} navProps={navProps} route={route} />
        {/* {!hideBack && <GoBack navigation={navigation} navProps={navProps} />} */}
      </View>
      {/* <View style={{ flex: 1 }}>{!hideLogo && <AstreeaSvg />}</View> */}

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <AccountSettings navigation={navigation} route={route} userName={userName} />
        {/* {!hideAccountSettings && <AccountSettings navigation={navigation} />} */}
      </View>
    </View>
  );
};

export default HeaderNavigator;
