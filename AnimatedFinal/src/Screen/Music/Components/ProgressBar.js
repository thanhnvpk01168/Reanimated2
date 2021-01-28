import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Animated, {useDerivedValue, interpolate} from 'react-native-reanimated';

import {useTrackPlayerProgress} from 'react-native-track-player';

const AnimatedView = Animated.createAnimatedComponent(View);
const Width_ViewProgressBlur = (Dimensions.get('screen').width - 75) / 2;
export const ProgressBar = ({}) => {    
  const {position, bufferedPosition, duration} = useTrackPlayerProgress();
  const animationProgress = useDerivedValue(() => {
    return interpolate(position, [0, duration], [0, Width_ViewProgressBlur]);
  });
  return (
    <View style={styles.viewProgress}>
      <AnimatedView
        style={[styles.viewProgressBlur, {width: animationProgress.value}]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewProgress: {
    width: Width_ViewProgressBlur,
    height: 5,
    backgroundColor: 'rgba(255, 165, 0,0.2)',
    borderRadius: 10,
    marginTop: 5,
  },
  viewProgressBlur: {
    width: Width_ViewProgressBlur,
    height: 5,
    backgroundColor: 'rgba(255, 165, 0,1)',
    borderRadius: 10,
  },
});
