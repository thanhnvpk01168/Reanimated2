import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import FastImage from 'react-native-fast-image';

const AnimatedView = Animated.createAnimatedComponent(View);
const {width, height} = Dimensions.get('screen');
const CARD_HEIGHT = width / 1.75 + 40;
export const RenderItem = React.memo(({item, index, scrollY}) => {
  const translateY = useDerivedValue(() => {
    const inputRange = [
      CARD_HEIGHT * (index - 1),
      CARD_HEIGHT * index,
      CARD_HEIGHT * (index + 1),
    ];
    const outputRangeTranslateY = [0, 0, CARD_HEIGHT];
    return interpolate(
      scrollY.value,
      inputRange,
      outputRangeTranslateY,
      'clamp',
    );
  });
  const scale = useDerivedValue(() => {
    const inputRange = [
      CARD_HEIGHT * (index - 1),
      CARD_HEIGHT * index,
      CARD_HEIGHT * (index + 0.9),
      CARD_HEIGHT * (index + 1),
    ];
    const outputRange = [1, 1, 0.7, 0];

    return interpolate(scrollY.value, inputRange, outputRange, 'clamp');
  });
  const opacity = useDerivedValue(() => {
    const inputRange = [
      CARD_HEIGHT * (index - 1),
      CARD_HEIGHT * index,
      CARD_HEIGHT * (index + 1),
    ];
    const outputRange = [1, 1, 0];

    return interpolate(scrollY.value, inputRange, outputRange, 'clamp');
  });
  const animItemStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });
  return (
    <AnimatedView
      style={[
        styles.main,
        animItemStyle,
      ]}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.avatar}
        source={item.cardImage1}
      />
    </AnimatedView>
  );
});
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
  },
  avatar: {
    width: width - 30,
    height: CARD_HEIGHT - 40,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
