import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, StyleSheet, Dimensions, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  useAnimatedProps,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);
let a = 0;
export function Loading2() {
  const animDotValue1 = useSharedValue(0);
  const animMonitoring = useSharedValue(0);
  const animDotDerived1 = useDerivedValue(() => {
    const inputRange = [0, 25, 50];
    return interpolate(
      animDotValue1.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP,
    );
  });
  const animDotDerived2 = useDerivedValue(() => {
    const inputRange = [0, 25, 50];
    return interpolate(
      animDotValue1.value,
      inputRange,
      [0.7, 0.7, 0.7],
      Extrapolate.CLAMP,
    );
  });
  const animDotStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animDotValue1.value,
        },
        {
          scale:
            animMonitoring.value == 1
              ? animDotDerived2.value
              : animDotDerived1.value,
        },
      ],
    };
  });
  const animDotStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -animDotValue1.value,
        },
        {
          scale:
            animMonitoring.value == 1
              ? animDotDerived1.value
              : animDotDerived2.value,
        },
      ],
    };
  });
  const animatedProps1 = useAnimatedProps(() => ({
    zIndex: animMonitoring.value == 1 ? 1 : 2,
    opacity: animMonitoring.value == 1 ? 1 : 0.6,
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    zIndex: animMonitoring.value == 1 ? 2 : 1,
    opacity: animMonitoring.value == 1 ? 0.6 : 1,
  }));
  useEffect(() => {
    animDotValue1.value = withRepeat(
      withSequence(
        withTiming(
          50,
          {
            duration: 1000,
            easing: Easing.linear,
          },
          () => (animMonitoring.value = 1),
        ),
        withTiming(
          0,
          {
            duration: 1000,
            easing: Easing.linear,
          },
          () => (animMonitoring.value = 0),
        ),
      ),
      -1,
    );
    // setTimeout(() => {
    //   animDotValue1.value = withTiming(100, {
    //     duration: 1000,
    //     easing: Easing.linear,
    //   });
    // }, 3000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <View style={styles.mainDot}>
          <AnimatedView
            animatedProps={animatedProps1}
            style={[styles.viewDot, styles.dot1, animDotStyle1]}
          />
          <AnimatedView
            animatedProps={animatedProps2}
            style={[styles.viewDot, styles.dot2, animDotStyle2]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // transform:[{

    // }]
  },
  viewDot: {
    width: 44,
    height: 44,
    borderRadius: 25,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  dot1: {
    backgroundColor: 'orange',
    transform: [
      {
        translateX: 40,
      },
    ],
    zIndex: 1,
  },
  dot2: {
    backgroundColor: 'green',
    zIndex: 2,
  },
});
