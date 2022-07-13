const defaultNavigationOptions = {
  headerShown: false,
  //   title: "",
  //   headerStyle: {
  //     backgroundColor: "#F2F6F7",
  //   },
  //   headerShadowVisible: false,
  //   headerTintColor: "#FF6400",
};

// const defaultNavigationOptions = {
// 	title: "",
// 	headerTitle: (props) => <AstreeaSvg {...props} />,
// 	headerLeft: (props) => <Text> asd</Text>,
// 	headerRight: (props) => <Text> asd</Text>,

// 	headerStyle: {
// 	  backgroundColor: "#F2F6F7",
// 	  headerTitleAlign: "center",
// 	},
// 	titleStyle: {
// 	  marginLeft: 30,
// 	},
// 	headerShadowVisible: false,
// 	headerTintColor: "#FF6400",
//   };

export default routes = {
  Home: {
    name: "Home",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  SignIn: {
    name: "SignIn",
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    name: "SignUp",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  Account: {
    name: "Account",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  ConnectQR: {
    name: "ConnectQR",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  ConnectDevice: {
    name: "ConnectDevice",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  SetupDevice: {
    name: "SetupDevice",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  DeviceDetails: {
    name: "DeviceDetails",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  ChargerSettings: {
    name: "ChargerSettings",
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
};
