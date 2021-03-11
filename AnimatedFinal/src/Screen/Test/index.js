import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, StyleSheet, Dimensions, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Svg, {G, Circle} from 'react-native-svg';
import Animated, {
  Easing,
  Extrapolate,
  useDerivedValue,
  interpolate,
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const {width} = Dimensions.get('screen');
const d = width / 4;
const strokeWidth = 7;
let abc = 0;
export function Test() {
  const inputRef = useRef();
  const animValue = useSharedValue(100);
  const circumference = useAnimatedProps(() => ({
    strokeDashoffset: animValue.value,
  }));
  //countdown
  const textCountDown = useDerivedValue(() => {
    const inputRange = [d * Math.PI, 0];
    return interpolate(
      animValue.value,
      inputRange,
      [0, 100],
      Extrapolate.CLAMP,
    );
  });
  const textAnimatedProps = useAnimatedProps(() => ({
    text: Math.round(textCountDown.value) + '',
  }));

  //scale
  const animOpacityDot = useDerivedValue(() => {
    const inputRange = [d * Math.PI, 0];
    return interpolate(
      animValue.value,
      inputRange,
      [0, 360],
      Extrapolate.CLAMP,
    );
  });
  const animOpacityDotStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${animOpacityDot.value}deg`}],
    };
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => {
            abc++;
            animValue.value = withTiming(abc % 2 == 0 ? d * Math.PI : 0, {
              duration: 1000,
              easing: Easing.linear,
            });
          }}>
          <Text>123123</Text>
          <Text>123123</Text>
          <Text>123123</Text>
        </TouchableOpacity>
        <View style={{borderWidth: 2}}>
          <Svg
            style={styles.svg}
            height={d}
            width={d}
            viewBox={`0 0 ${d + strokeWidth} ${d + strokeWidth}`}>
            <G
              rotation="-90"
              origin={`${(d + strokeWidth) / 2}, ${(d + strokeWidth) / 2}`}>
              <AnimatedCircle
                animatedProps={circumference}
                cx="50%"
                cy="50%"
                r={d / 2}
                // fill="silver"
                stroke={'green'}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                // strokeDashoffset={d * Math.PI - (5 * d * Math.PI) / 10}
                strokeDasharray={d * Math.PI}
              />
              <Circle
                cx="50%"
                cy="50%"
                r={d / 2}
                fill="transparent"
                stroke={'red'}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeOpacity=".2"
              />
            </G>
          </Svg>
          <AnimatedTextInput
            style={{color: 'red', borderWidth: 5}}
            animatedProps={textAnimatedProps}
            editable={false}
            value={'123'}
          />
          <AnimatedView
            style={[
              {
                height: d + 1,
                width: d + 1,
                position: 'absolute',
                justifyContent: 'flex-start',
                alignItems: 'center',
              },
              animOpacityDotStyle,
            ]}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: 'pink',
                borderRadius: 10,
                top: -5,
              }}></View>
          </AnimatedView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  a: {
    justifyContent: 'flex-start',
  },
});
