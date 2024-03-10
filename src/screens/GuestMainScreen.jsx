import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button';
import Colors from '../constants/Colors';

export default function GuestMainScreen({ navigation }) {
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
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>
              Free to play fantasy sport games with friends
            </Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              Fantasy Sports gives you the opportunity to run your own teams of professional players from across the leagues and receive points based on their performance in games each week. Join with friends in leagues and find whose team is the best.
            </Text>
          </View>
          <View style={styles.loginBox}>
            <Button title="Login" onPress={() => navigation.navigate('GuestLogin')} />
            <Button title="Sign up" onPress={() => navigation.navigate('GuestSign')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: Colors.white
  },
  screenContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBox: {
    padding: 24
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24
  },
  descriptionBox: {
    padding: 24
  },
  description: {},
  loginBox: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  }
});
