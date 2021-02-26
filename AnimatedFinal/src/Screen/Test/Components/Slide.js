import React, {useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolate,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedView = Animated.createAnimatedComponent(View);
export const Slide = ({navigation, data = [1, 2, 3, 4, 5, 6]}) => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.main}>
      <AnimatedFlatList
        removeClippedSubviews={false}
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        pagingEnabled
        decelerationRate={0}
        snapToInterval={width * 0.85}
        onScroll={scrollHandler}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: width * 0.85,
                height: 100,
                marginLeft: index == 0 ? width * 0.075 : 0,
                marginRight: index == data.length - 1 ? width * 0.075 : 0,
                paddingHorizontal: 5,
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.scale}
                source={{
                  uri:
                    'https://lh33.googleusercontent.com/proxy/iLSKs8eNcqY6TC7LS1uHyDRlsa84Or8fdA_QQjIRNXkdc_omUwMEnOQLIhUXN-nC0-NZdfKF8-M5mbKCMsO3nNGiYXF1pdw9k2-4TrCzS0xxPm5A5Vg',
                }}
                style={styles.img}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => `cardImage${index}`}
      />
      <View style={styles.viewDot}>
        {data.map((item, index) => {
          const animOpacityDot = useDerivedValue(() => {
            const inputRange = [
              (index - 1) * (width * 0.85),
              index * (width * 0.85),
              (index + 1) * (width * 0.85),
            ];
            return interpolate(
              scrollX.value,
              inputRange,
              [0.3, 1, 0.3],
              Extrapolate.CLAMP,
            );
          });
          const animOpacityDotStyle = useAnimatedStyle(() => {
            return {
              opacity: animOpacityDot.value,
            };
          });
          return (
            <AnimatedView
              key={`slideHome${index}`}
              style={[styles.dot, animOpacityDotStyle]}></AnimatedView>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 120,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width * 0.85 - 5,
    height: 120,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  viewDot: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 3,
  },
  dot: {
    width: 20,
    height: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 5,
  },
});
