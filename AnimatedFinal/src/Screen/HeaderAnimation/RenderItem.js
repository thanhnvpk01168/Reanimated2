import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  withRepeat,
  useDerivedValue,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

let WIDTH_SCREEN = Dimensions.get('screen').width;
export const RenderItem = React.memo(({Item, index, scrollY}) => {
  const [state, setstate] = useState({x: 0, width: 0});
  const _find_dimesions = (layout) => {
    const {x, y, width, height} = layout;
    setstate({x, width});
  };
  const itemAnimationTranslateX = useDerivedValue(() => {
    const inputRange = [-1000000, 0, 100, 1000000];
    let cal =
      -(state.width / 2 + state.x) +
      ((WIDTH_SCREEN / 4) * index - WIDTH_SCREEN / 4 / 2);
    return interpolate(scrollY.value, inputRange, [cal, cal, 0, 0]);
  });
  const itemAnimationTranslateY = useDerivedValue(() => {
    const inputRange = [-1000000, 0, 100, 1000000];

    return interpolate(scrollY.value, inputRange, [70, 70, 0, 0]);
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
    // const inputRange = [-1000000, 0, 100, 1000000];
    // let cal =
    //   -(state.width / 2 + state.x) +
    //   ((WIDTH_SCREEN / 4) * index - WIDTH_SCREEN / 4 / 2);

    // const translateX = interpolate(scrollY.value, inputRange, [cal, cal, 0, 0]);
    // const translateY = interpolate(scrollY.value, inputRange, [70, 70, 0, 0]);
    // return {
    //   transform: [
    //     {
    //       translateX:
    //         index == 1 || index == 2 || index == 3 || index == 4
    //           ? translateX
    //           : 0,
    //     },
    //     {
    //       translateY:
    //         index == 1 || index == 2 || index == 3 || index == 4
    //           ? translateY
    //           : 0,
    //     },
    //   ],
    // };
  }); //22222222
  const itemAnimationopacityColor = useDerivedValue(() => {
    const inputRange = [-1000000, 0, 100, 1000000];

    return interpolate(scrollY.value, inputRange, [1, 1, 0, 0]);
  });

  const opacityColorAnimationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        index == 1 || index == 2 || index == 3 || index == 4
          ? `rgba(255, 165, 1,${itemAnimationopacityColor.value})`
          : `rgba(255, 165, 1,${0})`,
    };
    // const inputRange = [-1000000, 0, 100, 1000000];

    // const opacityColor = interpolate(scrollY.value, inputRange, [1, 1, 0, 0]);
    // return {
    //   backgroundColor:
    //     index == 1 || index == 2 || index == 3 || index == 4
    //       ? `rgba(255, 165, 1,${opacityColor})`
    //       : `rgba(255, 165, 1,${0})`,
    // };
  });
  // end 2222
  // 33333333333
  const itemAnimationHeight = useDerivedValue(() => {
    const inputRangeHeight = [-1000000, 0, 70, 100, 1000000];

    return interpolate(scrollY.value, inputRangeHeight, [30, 30, 30, 0, 0]);
  });
  const itemAnimationopacityScale = useDerivedValue(() => {
    const inputRangeScaleX = [-1000000, 0, 100, 1000000];

    return interpolate(scrollY.value, inputRangeScaleX, [1, 1, 0, 0]);
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      height: itemAnimationHeight.value,
      transform: [{scale: itemAnimationopacityScale.value}],
    };
    // const inputRangeHeight = [-1000000, 0, 70, 100, 1000000];
    // const inputRangeScaleX = [-1000000, 0, 100, 1000000];

    // const height = interpolate(scrollY.value, inputRangeHeight, [
    //   30,
    //   30,
    //   30,
    //   0,
    //   0,
    // ]);
    // const scale = interpolate(scrollY.value, inputRangeScaleX, [1, 1, 0, 0]);
    // return {
    //   height,
    //   transform: [{scale}],
    // };
  });
  return (
    <AnimatedView
      onLayout={(event) => {
        _find_dimesions(event.nativeEvent.layout);
      }}
      style={[styles.main, itemAnimationStyle]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(index)}>
        <AnimatedView style={[styles.viewIcon, opacityColorAnimationStyle]}>
          <Item.TypeIcon name={Item.icon} size={25} color={'white'} />
        </AnimatedView>
        {index == 1 || index == 2 || index == 3 || index == 4 ? (
          <AnimatedText style={[styles.title, textAnimationStyle]}>
            {Item.title}
          </AnimatedText>
        ) : null}
      </TouchableOpacity>
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
