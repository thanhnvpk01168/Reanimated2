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
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

import SvgComponent from './SvgComponent'

export function Test() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text
          style={{
            textAlign: 'center',
            margin: 10,
            color: 'blue',
            fontWeight: 'bold',
          }}>
          Biểu đồ cột tính toán số dân ABCD
        </Text>
        <SvgComponent/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
