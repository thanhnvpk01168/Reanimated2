import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import FastImage from 'react-native-fast-image';
import {AntDesign} from '../../../Assets/VectorIcons/Icons';

const AnimatedView = Animated.createAnimatedComponent(View);
const {width, height} = Dimensions.get('screen');
const CARD_WIDTH = width / 2;
export const RenderItem = React.memo(({item, index, scrollX, length}) => {
  const translateY = useDerivedValue(() => {
    const inputRange = [
      (width / 2) * (index - 1),
      (width / 2) * index,
      (width / 2) * (index + 1),
    ];
    const outputRangeTranslateY = [80, 0, 80];
    return interpolate(
      scrollX.value,
      inputRange,
      outputRangeTranslateY,
      'clamp',
    );
  });
  const scale = useDerivedValue(() => {
    const inputRange = [
      (width / 2) * (index - 1),
      (width / 2) * index,
      (width / 2) * (index + 1),
    ];
    const outputRangeTranslateY = [0.7, 1, 0.7];
    return interpolate(
      scrollX.value,
      inputRange,
      outputRangeTranslateY,
      'clamp',
    );
  });

  const animItemStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
        {scale: scale.value},
      ],
    };
  });
  return (
    <AnimatedView style={[styles.main, {opacity: index == length - 1 ? 0 : 1}]}>
      <AnimatedView style={[styles.container, animItemStyle]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.avatar}
          source={item.movie}
        />
        <View style={styles.viewContent}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <View style={styles.viewStar}>
            <AntDesign name="star" color={'orange'} size={20} />
            <AntDesign name="star" color={'orange'} size={20} />
            <AntDesign name="star" color={'orange'} size={20} />
            <AntDesign name="star" color={'orange'} size={20} />
            <AntDesign name="staro" color={'orange'} size={20} />
          </View>
          <Text numberOfLines={2}>{item.description}</Text>
        </View>
      </AnimatedView>
    </AnimatedView>
  );
});

const styles = StyleSheet.create({
  main: {
    width: CARD_WIDTH,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: CARD_WIDTH + 20,
    height: (CARD_WIDTH * 429) / 290 + 120,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    right: -(CARD_WIDTH + 20) / 2,
    backgroundColor: 'white',
  },
  avatar: {
    width: CARD_WIDTH,
    height: (CARD_WIDTH * 429) / 290,
    borderRadius: 10,
    shadowColor: '#FFFFFF',
  },
  viewContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  viewStar: {
    flexDirection: 'row',
  },
});
