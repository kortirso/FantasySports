import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

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
    backgroundColor: '#ffc57b',
    borderWidth: 1,
    borderColor: '#ee7b41',
    borderRadius: 4
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16
  }
});
