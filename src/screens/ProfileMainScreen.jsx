import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image
} from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import Colors from '../constants/Colors';

export default function ProfileMainScreen() {
  const { authState, clearAuthState } = useAuth();

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
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileLogo}
              source={{ uri: authState.gravatar }}
            />
            <Text style={styles.profileEmail}>{authState.email}</Text>
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
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 80
  },
  profileLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  profileEmail: {
    marginVertical: 12,
    fontSize: 18
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
