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

import {dataChart} from './data';

const {width, height} = Dimensions.get('screen');

const calculHeightChart = (maxValue, currentValue, height) => {
  return (currentValue * height) / maxValue;
};

const RenderItemChart = React.memo(({item, index, maxValue}) => {
  const animItemValue = useSharedValue(0);
  const animItemStyle = useAnimatedStyle(() => {
    return {
      height: animItemValue.value,
    };
  });
  const startAnim = (value) => {
    animItemValue.value = withTiming(value, {
      duration: 4000,
      easing: Easing.out(Easing.exp),
    });
  };
  useEffect(() => {
    if (maxValue != 10) {
      startAnim(calculHeightChart(maxValue, item.vietnamese, 300));
    }
  }, [maxValue]);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingTop: 20,
        height: 300,
        justifyContent: 'flex-end',
        alignItems:'center'
      }}>
      <Text>{item.vietnamese}</Text>
      <Animated.View
        style={[
          {
            height: 0,
            width: 20,
            backgroundColor: 'blue',
          },
          animItemStyle,
        ]}
      />
    </View>
  );
});

export function Chart() {
  const [maxValue, setMaxValue] = useState(10);
  let maxValueF = 10;
  useEffect(() => {
    for (let i = 0; i < dataChart.length; i++) {
      if (i == dataChart.length - 1) {
        if (maxValueF <= dataChart[i].vietnamese) {
          setMaxValue(dataChart[i].vietnamese);
        } else {
          setMaxValue(maxValueF);
        }
      } else {
        if (maxValueF <= dataChart[i].vietnamese) {
          maxValueF = dataChart[i].vietnamese;
        }
      }
    }
  }, [dataChart]);
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
        <View style={styles.viewChart}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dataChart}
            horizontal
            renderItem={({item, index}) => {
              return (
                <RenderItemChart
                  item={item}
                  index={index}
                  maxValue={maxValue}
                />
              );
            }}
            keyExtractor={(e, i) => `chart${i}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewChart: {
    width: '100%',
    height: 300,
    paddingHorizontal: 10,
    borderBottomWidth:2
  },
});
