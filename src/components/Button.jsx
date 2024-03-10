import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

import Colors from '../constants/Colors';

export default function Button({ title, onPress }) {
  return (
    <Pressable style={styles.buttonBox} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.goldeenLight,
    borderWidth: 1,
    borderColor: Colors.goldeenMiddle,
    borderRadius: 4
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16
  }
});
