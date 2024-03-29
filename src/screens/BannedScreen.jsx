import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import {strings} from '../locales';

import {destroyUser} from '../api';
import {useAuth} from '../contexts/AuthContext';
import Colors from '../constants/Colors';

export default function BannedScreen() {
  const {authState, clearAuthState} = useAuth();

  strings.setLanguage(authState.locale);

  const onDeleteUser = async () => {
    const response = await destroyUser(authState.accessToken);
    if (response.result === 'ok') {
      clearAuthState();
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.stone100}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.stone100} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}>
        <View style={styles.container}>
          <View>
            <Text style={styles.description}>{strings.profile.banned}</Text>
          </View>
          <Pressable style={styles.logoutBox} onPress={() => clearAuthState()}>
            <Text style={styles.logoutText}>{strings.profile.logout}</Text>
          </Pressable>
          <Pressable style={styles.logoutBox} onPress={() => onDeleteUser()}>
            <Text style={styles.logoutText}>{strings.profile.delete}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  screenContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  container: {
    width: '100%',
    padding: 24,
    flexDirection: 'column',
    gap: 12,
  },
  description: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 6,
  },
  logoutBox: {
    marginVertical: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.red600,
  },
});
