import React from "react";
import { Text, View } from "react-native";
import { style } from "./HomeStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import HeaderBackButton from "../../components/GeneralComponents/HeaderBackButton";
import AstreeaSvg from "../../components/GeneralComponents/AstreeaSVG";
const Home = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={() => alert("This is a button!")}>settings </Text>
      ),
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("SignIn")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={style.wrapper}>
      <Text>Homeeee</Text>
    </View>
  );
};

export default Home;
