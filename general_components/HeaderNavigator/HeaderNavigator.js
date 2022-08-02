import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AstreeaSvg from './AstreeaSVG';
import {style} from './HeaderNavigator.style';
import GoBack from './GoBack';
import AccountSettings from './AccountSettings';

const HeaderNavigator = ({
  navigation,
  hideLogo,
  hideAccountSettings,
  hideBack,
  navProps,
}) => {
  return (
    <View style={style.headerContainer}>
      <View style={{flex: 1.5}}>
        {!hideBack && <GoBack navigation={navigation} navProps={navProps} />}
      </View>
      <View style={{flex: 4}}>{!hideLogo && <AstreeaSvg />}</View>

      <View style={{flex: 1}}>
        {!hideAccountSettings && <AccountSettings navigation={navigation} />}
      </View>
    </View>
  );
};

export default HeaderNavigator;
