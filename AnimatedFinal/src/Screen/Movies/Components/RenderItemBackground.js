import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import FastImage from 'react-native-fast-image';

const AnimatedView = Animated.createAnimatedComponent(View);
const {width} = Dimensions.get('screen');
const WIDTH_IMAGE = width;
const HEIGHT_IMAGE = (width * 429) / 290;
export const RenderItemBackground = React.memo(
  ({item, index, scrollX, length}) => {
    const translateX = useDerivedValue(() => {
      const inputRange = [
        (width / 2) * (index - 1),
        (width / 2) * index,
        (width / 2) * (index + 1),
      ];
      const outputRange = [0, 0, -width];
      return interpolate(scrollX.value, inputRange, outputRange, 'clamp');
    });

    const animItemStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: translateX.value,
          },
        ],
      };
    });
    console.log(length);
    return (
      <AnimatedView
        style={[
          {
            top: -HEIGHT_IMAGE * index,
          },
          animItemStyle,
          ,
        ]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.avatar]}
          source={item.movie}
        />
      </AnimatedView>
    );
  },
);
const styles = StyleSheet.create({
  avatar: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    shadowColor: '#FFFFFF',
  },
});
