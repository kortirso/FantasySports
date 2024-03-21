import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Button, Popup, FormField} from '../components';
import {getAccessToken, createUser} from '../api';

import {useAuth} from '../contexts/AuthContext';
import Colors from '../constants/Colors';

export default function GuestMainScreen({navigation}) {
  const {updateAuthState} = useAuth();
  const [pageState, setPageState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    modalForLogin: false,
    modalForSignup: false,
  });

  const loginUser = async () => {
    const response = await getAccessToken(pageState.email, pageState.password);

    if (!response) {
      setPageState({...pageState, errors: ['Undefined error']});
    } else if (response.errors) {
      setPageState({...pageState, errors: response.errors});
    } else {
      updateAuthState(response.user.data.attributes);
    }
  };

  const signUser = async () => {
    const response = await createUser(
      pageState.email,
      pageState.password,
      pageState.passwordConfirmation,
    );

    if (!response) {
      setPageState({...pageState, errors: ['Undefined error']});
    } else if (response.errors) {
      setPageState({...pageState, errors: response.errors});
    } else {
      updateAuthState(response.user.data.attributes);
    }
  };

  const renderErrors = () => {
    if (pageState.errors.length === 0) {
      return <></>;
    }

    return (
      <View>
        {pageState.errors.map((error, index) => (
          <View key={index}>
            <Text style={{color: Colors.red600}}>{error}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.stone100}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.stone100} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}>
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>
              Free to play fantasy sport games with friends
            </Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              Fantasy Sports gives you the opportunity to run your own teams of
              professional players from across the leagues and receive points
              based on their performance in games each week. Join with friends
              in leagues and find whose team is the best.
            </Text>
          </View>
          <View style={styles.loginBox}>
            <Button
              title="Login"
              onPress={() => setPageState({...pageState, modalForLogin: true})}
            />
            <Button
              title="Sign up"
              onPress={() => setPageState({...pageState, modalForSignup: true})}
            />
          </View>
        </View>
        <Popup
          visible={pageState.modalForLogin}
          onRequestClose={() =>
            setPageState({...pageState, modalForLogin: false, errors: []})
          }
          title="Login">
          <View style={{flexDirection: 'column', gap: 16}}>
            <FormField
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              onChangeText={value => setPageState({...pageState, email: value})}
            />
            <FormField
              label="Password"
              placeholder="Enter password"
              keyboardType="default"
              onChangeText={value =>
                setPageState({...pageState, password: value})
              }
            />
            {renderErrors()}
            <Button title="Login" onPress={() => loginUser()} />
          </View>
        </Popup>
        <Popup
          visible={pageState.modalForSignup}
          onRequestClose={() =>
            setPageState({...pageState, modalForSignup: false, errors: []})
          }
          title="Signup">
          <View style={{flexDirection: 'column', gap: 16}}>
            <FormField
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              onChangeText={value => setPageState({...pageState, email: value})}
            />
            <FormField
              label="Password"
              placeholder="Enter password"
              keyboardType="default"
              onChangeText={value =>
                setPageState({...pageState, password: value})
              }
            />
            <FormField
              label="Password confirmation"
              placeholder="Repeat password"
              keyboardType="default"
              onChangeText={value =>
                setPageState({...pageState, passwordConfirmation: value})
              }
            />
            {renderErrors()}
            <Button title="Sign up" onPress={() => signUser()} />
          </View>
        </Popup>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  screenContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    padding: 24,
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24,
  },
  descriptionBox: {
    padding: 24,
  },
  description: {},
  loginBox: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 12,
  },
});
