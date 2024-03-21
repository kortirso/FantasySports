import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

import Colors from '../constants/Colors';

const Button = ({
  title,
  onPress,
  size = 'default',
  buttonBoxStyles = {},
  buttonTextStyles = {},
}) => (
  <Pressable
    style={[
      styles.buttonBox,
      size === 'big' ? styles.buttonBoxBig : {},
      buttonBoxStyles,
    ]}
    onPress={onPress}>
    <Text
      style={[
        styles.buttonText,
        size === 'big' ? styles.buttonTextBig : {},
        buttonTextStyles,
      ]}>
      {title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  buttonBox: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.goldeenLight,
    borderWidth: 1,
    borderColor: Colors.goldeenMiddle,
    borderRadius: 4,
  },
  buttonBoxBig: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTextBig: {
    fontSize: 20,
  },
});

export {Button};
