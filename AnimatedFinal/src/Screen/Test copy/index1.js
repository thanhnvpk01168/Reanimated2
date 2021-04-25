import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, StyleSheet, Dimensions, View, Text} from 'react-native';
import {RNHoleView} from 'react-native-hole-view';
import {SafeAreaView} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import Svg, {
  G,
  LinearGradient,
  Circle,
  Defs,
  Ellipse,
  ClipPath,
  Rect,
  Image,
  Stop,
  RadialGradient,
} from 'react-native-svg';
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

import SvgComponent from './SvgComponent';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const {width, height} = Dimensions.get('screen');
const d = width / 4;
const strokeWidth = 7;
let abc = 0;

export function Test() {
  //282
  const animValue = useSharedValue(100);
  const circumference = useAnimatedProps(() => ({
    strokeDashoffset: animValue.value,
    // strokeDashoffset: d * Math.PI,
    // strokeDashoffset: 200,
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
    text: Math.round(textCountDown.value) + ' %',
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
  console.log(JSON.stringify(RNHoleView));
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <TouchableOpacity>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
        <Text style={{fontSize: 30}}>van thanh nguyen fpt polytechnic</Text>
      </TouchableOpacity>
      <View
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: 'rgba(1,111,1,0.8)',
        }}></View>
      <RNHoleView
        style={{
          position: 'absolute',
          width: width,
          height: height,
          backgroundColor: 'rgba(34,146,231,1)',
        }}
        holes={[
          {
            x: width / 2 - 60,
            y: height / 2 - 60,
            width: 120,
            height: 120,
            borderRadius: 11,
          },
        ]}></RNHoleView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewSVG: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLoad: {
    position: 'absolute',
  },
  btnGo: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  go: {
    color: 'white',
    fontWeight: 'bold',
  },
  viewMask: {
    position: 'absolute',
    top: -width / 2 + 100,
    left: -width / 2 + 100,
    right: -width / 2 + 100,
    bottom: -width / 2 + 100,
    backgroundColor: 'transparent',

    borderWidth: width / 2,
    borderRadius: width,
    borderColor: 'red',
    opacity: 1,
  },
});
