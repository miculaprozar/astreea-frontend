import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Text, View, Pressable} from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Layout from '../../general_components/Layout';
import {style} from './Account.style';
import validationSchema from './validationSchema';
import routes from '../../routes';
import HeaderNavigator from '../../general_components/HeaderNavigator/HeaderNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiFactory} from '../../api/index.js';
import SnackBar from '../../general_components/SnackBar';

const Account = (props) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [logType, setLogType] = useState('error');

  const {navigation} = props;

  const {SignIn} = routes;

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('token');
      setToken(tokenValue);
      if (tokenValue !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log('ERROR IN READING', e);
      // error reading value
    }
  };

  const populateUserData = async () => {
    try {
      firstName = await AsyncStorage.getItem('firstName');
      lastName = await AsyncStorage.getItem('lastName');
      setValue('firstName', firstName);
      setValue('lastName', lastName);
    } catch (e) {
      console.log('Error getting firstName, lastName:', e);
      // error reading value
    }
  };

  useEffect(() => {
    populateUserData();
    getToken();
  }, []);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (exception) {}
  };
  const navigateToSignIn = () => {
    removeToken();

    navigation.navigate(SignIn.name);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      console.log(token);
      const resp = await apiFactory().data.account().changePassword(token, {
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log(resp);
      AsyncStorage.setItem('firstName', resp[0].firstName);
      AsyncStorage.setItem('lastName', resp[0].lastName);
      setLogType('info');
      setError('Successfully updated your profile');
    } catch (e) {
      console.log('the e is ', e.message);
      setLogType('error');
      setError('Error in user details!');
    }
  };

  return (
    <Layout scrollView={true}>
      <Layout.Header>
        <HeaderNavigator navigation={navigation} hideAccountSettings={true} />
      </Layout.Header>
      <Layout.Body>
        <View style={{flex: 1}}>
          <Text style={style.title}>My account</Text>
        </View>
        <View style={{flex: 10}}>
          <Input
            label={'First name'}
            marginBottom={12}
            validateInput={true}
            control={control}
            errors={errors.firstName?.message}
            name={'firstName'}
            secureTextEntry={false}
            value={'abc'}
          />
          <Input
            label={'Last name'}
            marginBottom={12}
            validateInput={true}
            control={control}
            errors={errors.lastName?.message}
            name={'lastName'}
            secureTextEntry={false}
          />
          <Pressable onPress={() => navigation.navigate('RessetPassword')}>
            <Text style={style.buttonsText}>Change Password</Text>
          </Pressable>
        </View>
        <View style={{flex: 3}}>
          <Button
            isSecondary
            text={'Log out'}
            marginTop={10}
            marginBottom={15}
            onPressAction={navigateToSignIn}
          />
          <Button
            text={'Save settings'}
            marginTop={10}
            marginBottom={35}
            onPressAction={handleSubmit(onSubmit)}
          />
          {/* <Button
            text={"Change password"}
            marginTop={10}
            marginBottom={35}
            onPressAction={handleSubmit(onSubmit)}
          /> */}
        </View>
        {error && (
          <SnackBar
            text={error}
            logSnackbar={error}
            setLogSnackbar={setError}
            logType={logType}
          />
        )}
      </Layout.Body>
    </Layout>
  );
};

export default Account;
