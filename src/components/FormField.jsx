import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import Colors from '../constants/Colors';

const FormField = ({
  label,
  placeholder,
  keyboardType,
  onChangeText,
  secureTextEntry = false
}) => (
  <View style={styles.sectionStyle}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.inputStyle}
      onChangeText={(value) => onChangeText(value)}
      placeholder={placeholder}
      placeholderTextColor={Colors.stone300}
      autoCapitalize="none"
      keyboardType={keyboardType}
      returnKeyType="next"
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  sectionStyle: {
    backgroundColor: Colors.white
  },
  inputLabel: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600'
  },
  inputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.stone300,
    borderRadius: 4
  }
});

export { FormField };
