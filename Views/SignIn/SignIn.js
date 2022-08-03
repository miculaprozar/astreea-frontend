import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Text, Pressable} from 'react-native';
import {apiFactory} from '../../api/index.js';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Layout from '../../general_components/Layout.js';
import {style} from './SignIn.style';
import validationSchema from './validationSchema';
import routes from '../../routes.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from '../../general_components/SnackBar';

const SignIn = () => {
  const navigation = useNavigation();

  const [error, setError] = useState(false);

  const {Home, SignUp, ForgotPassword} = routes;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const token = await apiFactory().data.account().login(data);
      console.log(token);
      storeData(token);
      navigation.navigate(Home.name);
      setError(false);
    } catch (e) {
      console.log('WE ARE IN CATCHjjjjjj', e);
      setError(e.response.data.message);
    }
  };

  const storeData = async (token) => {
    try {
      const a = await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log('THE TOKEN ERROR', e);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate(SignUp.name);
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate(Home.name);
      }
    };
    isUserLoggedIn().catch((e) =>
      console.log('Error in getting already logged user token', e),
    );
  }, []);

  return (
    <>
      <Layout scrollView={true}>
        <Layout.Header>
          <Text style={style.title}>astreea</Text>
          <Text style={style.description}>
            The only electric charger you need
          </Text>
        </Layout.Header>

        <Layout.Body content="center">
          <Input
            label={'Email'}
            marginBottom={15}
            validateInput={true}
            control={control}
            errors={errors.email?.message}
            name={'email'}
            secureTextEntry={false}
          />
          <Input
            label={'Password'}
            marginBottom={15}
            validateInput={true}
            control={control}
            errors={errors.password?.message}
            name={'password'}
            secureTextEntry={true}
          />
          <Pressable onPress={() => navigation.navigate(ForgotPassword.name)}>
            <Text style={style.forgotPasswordText}>Forgot Password</Text>
          </Pressable>
        </Layout.Body>

        <Layout.Footer>
          <Button
            text={'Sign In'}
            marginBottom={10}
            onPressAction={handleSubmit(onSubmit)}
          />
          <Text style={style.betweenButtonsText}>OR</Text>
          <Button
            isSecondary
            text={'Sign Up with Email'}
            marginTop={10}
            marginBottom={10}
            onPressAction={navigateToSignUp}
          />

          <Text style={style.termsText}>
            By Continuing you agree to the Terms and Conditions
          </Text>
          {error && (
            <SnackBar
              text={error}
              logSnackbar={error}
              setLogSnackbar={setError}
              logType="error"
            />
          )}
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default SignIn;
