import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import Colors from '../constants/Colors';

export default function UnconfirmedScreen() {
  const { clearAuthState } = useAuth();

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
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 6 }}>Your email is not confirmed yet.</Text>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 6 }}>Please check your mailbox.</Text>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 6 }}>After confirming email - please re-login in the application.</Text>
          </View>
          <Pressable style={styles.logoutBox} onPress={() => clearAuthState()}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
          <Pressable style={styles.logoutBox} onPress={() => console.log("Delete account press")}>
            <Text style={styles.logoutText}>Delete account</Text>
          </Pressable>
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
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  container: {
    width: '100%',
    padding: 24,
    flexDirection: 'column',
    gap: 12
  },
  logoutBox: {
    marginVertical: 4
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.red600
  }
});
