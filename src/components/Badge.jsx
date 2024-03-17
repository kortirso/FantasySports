import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default Badge = ({ value }) => (
  <View style={styles.badgeBox}>
    <Text style={styles.badgeText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  badgeBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.stone700,
    borderWidth: 1,
    borderColor: Colors.stone800,
    borderRadius: 4
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.white
  }
});
