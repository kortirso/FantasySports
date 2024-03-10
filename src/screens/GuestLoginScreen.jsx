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
import { useAuth } from '../contexts/AuthContext';
import { getAccessToken } from '../api/authApi';

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
    <SafeAreaView style={{ backgroundColor: "#f5f5f4" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f5f5f4"
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(value) => setPageState({ ...pageState, email: value })}
              placeholder="Enter email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(value) => setPageState({ ...pageState, password: value })}
              placeholder="Enter password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>
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
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d6d3d1',
    borderRadius: 4,
    padding: 24,
    flexDirection: 'column',
    gap: 12
  },
  title: {
    fontSize: 20
  },
  sectionStyle: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#d6d3d1',
  },
  inputStyle: {
    
  }
});
