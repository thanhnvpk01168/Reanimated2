import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import {RenderItem} from './RenderItem';
import {dataTab} from './Asset';
import {Container} from './Container';
import {useCallback} from 'react';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const WIDTH_SCREEN = Dimensions.get('screen').width;
export const HeaderAnimation = React.memo(({navigation}) => {
  const _renderItem = useCallback(
    (item, index) => (
      <RenderItem
        key={`bottomTab${index}`}
        Item={item}
        index={index}
        scrollY={scrollY}
      />
    ),
    [],
  );
  // start annimation
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  // animation width height
  const animationHeight = useDerivedValue(() => {
    const inputRange = [-1000000, 0, 100, 1000000];

    return interpolate(scrollY.value, inputRange, [70, 70, 0, 0]);
  });
  const heightAnimationStyle = useAnimatedStyle(() => {
    return {
      height: animationHeight.value,
    };
  });
  // animation width height search
  const searchAnimationStyle = useAnimatedStyle(() => {
    const inputRangeWidth = [-1000000, 0, 100, 1000000];
    const inputRangeHeight = [-1000000, 0, 80, 100, 1000000];
    const widthSearch = (WIDTH_SCREEN / 7) * 5;
    const width = interpolate(scrollY.value, inputRangeWidth, [
      widthSearch,
      widthSearch,
      0,
      0,
    ]);
    const opacity = interpolate(scrollY.value, inputRangeHeight, [
      1,
      1,
      1,
      0,
      0,
    ]);
    return {
      width,
      opacity,
    };
  });
  // end annimation
  console.log('index');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <ImageBackground
          source={require('../../Assets/Images/background.jpg')}
          style={styles.image}>
          <View style={styles.viewHeader}>
            {dataTab.map(_renderItem)}

            <AnimatedView style={[styles.viewSearch, searchAnimationStyle]}>
              <Text numberOfLines={1} style={styles.placehoderSearch}>
                Tìm kiếm
              </Text>
            </AnimatedView>
          </View>

          <AnimatedView style={[heightAnimationStyle]} />
          <View style={{backgroundColor: 'white'}}>
            <AnimatedFlatList
              bounces={false}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={[1]}
              decelerationRate="fast"
              renderItem={() => {
                return <Container />;
              }}
              onScroll={scrollHandler}
              keyExtractor={(item, index) => `headerAnimation${index}`}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  viewHeader: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 34, 0,0.6)',
  },
  viewSearch: {
    width: (Dimensions.get('screen').width / 7) * 5,
    height: 40,
    position: 'absolute',
    justifyContent: 'center',
    top: 7.5,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingLeft: Dimensions.get('screen').width / 7 / 2 + 10,
  },
  placehoderSearch: {
    color: 'white',
  },
});
