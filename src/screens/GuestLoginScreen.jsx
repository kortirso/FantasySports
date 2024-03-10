import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Button from '../components/Button';
import FormField from '../components/FormField';
import { useAuth } from '../contexts/AuthContext';
import { getAccessToken } from '../api/authApi';
import Colors from '../constants/Colors';

export default function GuestLoginScreen({ navigation }) {
  const { setAccessToken } = useAuth();
  const [pageState, setPageState] = useState({
    email: '',
    password: ''
  });

  const loginUser = async () => {
    const response = await getAccessToken(pageState.email, pageState.password);
    if (!!response) setAccessToken(response.access_token);
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.stone100 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.stone100}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}
      >
        <View style={styles.container}>
          <FormField
            label="Email"
            placeholder="Enter email"
            keyboardType="email-address"
            onChangeText={(value) => setPageState({ ...pageState, email: value })}
          />
          <FormField
            label="Password"
            placeholder="Enter password"
            keyboardType="email-address"
            onChangeText={(value) => setPageState({ ...pageState, password: value })}
          />
          <Button title="Login" onPress={() => loginUser()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%'
  },
  screenContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '75%',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.stone300,
    borderRadius: 4,
    padding: 24,
    flexDirection: 'column',
    gap: 12
  }
});
