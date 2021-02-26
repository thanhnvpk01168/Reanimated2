import React, {useState, useMemo} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);
let WIDTH_SCREEN = Dimensions.get('screen').width;

const inputRange = [0, 70];
const inputRangeHeight = [0, 40, 70];

export const RenderItem = React.memo(({Item, index, scrollY}) => {
  const [state, setstate] = useState({x: 0, width: 0});
  const _find_dimesions = (layout) => {
    const {x, y, width, height} = layout;
    setstate({x, width});
  };
  const itemAnimationTranslateX = useDerivedValue(() => {
    let cal =
      -(state.width / 2 + state.x) +
      ((WIDTH_SCREEN / 4) * index - WIDTH_SCREEN / 4 / 2);
    return interpolate(scrollY.value, inputRange, [cal, 0], 'clamp');
  });
  const itemAnimationTranslateY = useDerivedValue(() => {
    return interpolate(scrollY.value, inputRange, [70, 0], 'clamp');
  });
  const itemAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            index == 1 || index == 2 || index == 3 || index == 4
              ? itemAnimationTranslateX.value
              : 0,
        },
        {
          translateY:
            index == 1 || index == 2 || index == 3 || index == 4
              ? itemAnimationTranslateY.value
              : 0,
        },
      ],
    };
  });
  const itemAnimationOpacityColor = useDerivedValue(() => {
    return interpolate(scrollY.value, inputRange, [1, 0], 'clamp');
  });

  const opacityColorAnimationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        index == 1 || index == 2 || index == 3 || index == 4
          ? `rgba(255, 165, 1,${itemAnimationOpacityColor.value})`
          : `rgba(255, 165, 1,${0})`,
    };
  });

  const itemAnimationHeight = useDerivedValue(() => {
    return interpolate(scrollY.value, inputRangeHeight, [30, 30, 0], 'clamp');
  });
  const itemAnimationOpacityScale = useDerivedValue(() => {
    return interpolate(scrollY.value, inputRange, [1, 0], 'clamp');
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      height: itemAnimationHeight.value,
      transform: [{scale: itemAnimationOpacityScale.value}],
    };
  });
  return (
    <AnimatedView
      onLayout={(event) => {
        _find_dimesions(event.nativeEvent.layout);
      }}
      style={[styles.main, itemAnimationStyle]}>
      <AnimatedView style={[styles.viewIcon, opacityColorAnimationStyle]}>
        <Item.TypeIcon name={Item.icon} size={25} color={'white'} />
      </AnimatedView>
      {index == 1 || index == 2 || index == 3 || index == 4 ? (
        <AnimatedText style={[styles.title, textAnimationStyle]}>
          {Item.title}
        </AnimatedText>
      ) : null}
    </AnimatedView>
  );
});
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    padding: 5,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
});
