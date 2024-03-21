import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default function PredictionIcon({focused, color, size}) {
  return (
    <View>
      <Svg height={size} width={size} viewBox="0 0 24 24">
        <Path
          d="M 2 2 L 22 2 L 22 18 L 2 18 Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <Path d="M 12 2 L 12 18" fill="none" stroke={color} strokeWidth="1" />
        <Path
          d="M 6 18 L 18 18 L 18 23 L 6 23 Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <Path
          d="M 4.5 6 L 9 6 L 9 14 L 4.5 14"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <Path d="M 4.5 10 L 9 10" fill="none" stroke={color} strokeWidth="1" />
        <Path
          d="M 14.5 6 L 19 6 L 19 10 L 15 10 L 15 14 L 19.5 14"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
}
