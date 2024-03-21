import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

export default function DraftMainScreen() {
  return (
    <SafeAreaView style={{backgroundColor: Colors.stone100}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.stone100} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}>
        <View style={styles.container} />
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
});
