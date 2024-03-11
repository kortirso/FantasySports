import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function ProfileIcon({ focused, color, size }) {
  return (
    <View>
      <Svg height={size} width={size} viewBox="0 0 24 24">
        <Circle
          cx="12"
          cy="7"
          r="5.75"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />
        <Path
          d="M21.25,21c-0,0.966 -0.783,1.75 -1.75,1.75l-15,-0c-0.967,-0 -1.75,-0.784 -1.75,-1.75c-0,-4.28 3.47,-7.75 7.75,-7.75l3,0c4.28,0 7.75,3.47 7.75,7.75Zm-0.729,0.729c-0.013,0.005 -0.021,0.011 -0.021,0.021l0.021,-0.021Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};
