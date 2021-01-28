import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  withRepeat,
} from 'react-native-reanimated';
import {AntDesign} from '../../../Assets/VectorIcons/Icons';
const {height, width} = Dimensions.get('screen');
const AnimatedView = Animated.createAnimatedComponent(View);

export const ItemHeart = React.memo(({index, item}) => {
  const animHeart = useSharedValue(0);
  const startAnimHeart = (value) => {
    animHeart.value = withTiming(value, {
      duration: 6000,
      easing: Easing.ease,
    });
  };

  const heartAnimationStyle = useAnimatedStyle(() => {
    const inputRange = [-(height + 100), 0];
    const inputRange1 = [
      -(height + 100),
      -(height + 100) / 2,
      -(height + 100) / 3,
      -(height + 100) / 4,
      -(height + 100) / 5,
      0,
    ];
    const translateY = interpolate(animHeart.value, inputRange, [
      -(height + 100),
      0,
    ]);
    const outputRange1 = [-40, 0, 20, 0, -20, -40];
    const outputRange2 = [40, 0, -20, 0, 20, 40];
    const translateX = interpolate(
      animHeart.value,
      inputRange1,
      index % 2 == 0 ? outputRange2 : outputRange1,
    );
    return {
      transform: [{translateY}, {translateX}],
    };
  });

  useEffect(() => {
    startAnimHeart(-(height + 100));
  }, []);
  return (
    <AnimatedView
      style={[
        styles.Main,
        {
          //   right: Math.floor(Math.random() * (width - 100)),
        },

        heartAnimationStyle,
      ]}>
      <AntDesign
        name={'heart'}
        size={Math.floor(Math.random() * 10) + 30}
        color={'red'}
      />
    </AnimatedView>
  );
});
const styles = StyleSheet.create({
  Main: {
    width: 100,
    height: 100,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
