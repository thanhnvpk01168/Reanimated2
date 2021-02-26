import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import {RenderItem} from './RenderItem';
import {dataTab} from './Asset';
import {Container} from './Container';
import {useCallback} from 'react';

const AnimatedView = Animated.createAnimatedComponent(View);
const WIDTH_SCREEN = Dimensions.get('screen').width;

const inputRangeWidth = [0, 70];
const inputRangeHeight = [0, 50, 70];
const widthSearch = (WIDTH_SCREEN / 7) * 5;

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

  // animation width height search
  const searchAnimationStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollY.value,
      inputRangeWidth,
      [widthSearch, 0],
      'clamp',
    );
    const opacity = interpolate(
      scrollY.value,
      inputRangeHeight,
      [1, 1, 0],
      'clamp',
    );
    return {
      width,
      opacity,
    };
  });
  // end annimation
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
          <Container scrollY={scrollY} />
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
    // position: 'absolute',
    // top: 0,
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
