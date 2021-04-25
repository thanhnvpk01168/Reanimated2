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
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export function Loading1() {
  const animDotValue1 = useSharedValue(0);
  const animDotValue2 = useSharedValue(0);
  const animDotValue3 = useSharedValue(0);

  const animDotStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animDotValue1.value,
        },
      ],
    };
  });

  const animDotStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animDotValue2.value,
        },
      ],
    };
  });
  const animDotStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animDotValue3.value,
        },
      ],
    };
  });
  useEffect(() => {
    animDotValue1.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        }),
        withTiming(0, {
          duration: 1000,
          easing: Easing.linear,
        }),
      ),
      -1,
    );
    animDotValue2.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: 1000,
            easing: Easing.linear,
          }),
          withTiming(0, {
            duration: 1000,
            easing: Easing.linear,
          }),
        ),
        -1,
      ),
    );
    animDotValue3.value = withDelay(
      600,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: 1000,
            easing: Easing.linear,
          }),
          withTiming(0, {
            duration: 1000,
            easing: Easing.linear,
          }),
        ),
        -1,
      ),
    );
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AnimatedView style={[styles.viewDot, animDotStyle1]} />
          <AnimatedView style={[styles.viewDot, animDotStyle2]} />
          <AnimatedView style={[styles.viewDot, animDotStyle3]} />
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
  viewDot: {
    width: 15,
    height: 15,
    borderRadius: 25,
    backgroundColor: 'blue',
    marginRight: 10,
  },
});
