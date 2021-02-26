import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign, FontAwesome} from '../../Assets/VectorIcons/Icons';
import {colorRenderTabs} from './Asset';

const AnimatedView = Animated.createAnimatedComponent(View);
const {width} = Dimensions.get('screen');
export const RenderItem = React.memo(
  ({Item, index, startAnimBlloons, checkedTab, flatListTab}) => {
    const [positionTabIcon, setPositionTabIcon] = useState({x: 0, width: 0});
    const _find_dimesions = (layout) => {
      const {x, y, width, height} = layout;
      setPositionTabIcon({x, width});
    };

    // start animation
    const animTab = useSharedValue(10);
    const animTabStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: animTab.value}],
      };
    });
    const startAnimTab = (value) => {
      animTab.value = withTiming(value, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    };
    //end animation

    useEffect(() => {
      if (Item.id == checkedTab) {
        startAnimTab(-14);
      } else {
        startAnimTab(12);
      }
    }, [checkedTab]);
    return (
      <AnimatedView
        onLayout={(event) => {
          _find_dimesions(event.nativeEvent.layout);
        }}
        style={[styles.viewTab, animTabStyle]}>
        <TouchableOpacity
          style={[styles.btn]}
          activeOpacity={0.6}
          onPress={() => {
            flatListTab.scrollToOffset({
              animated: true,
              offset: Dimensions.get('window').width * index,
            });
            startAnimBlloons(
              (2 * positionTabIcon.x + positionTabIcon.width) / 2 - 50 / 2,
              Item.id,
            );
          }}>
          <Item.TypeIcon
            name={Item.icon}
            size={25}
            color={checkedTab == Item.id ? 'white' : 'rgb(128,128,128)'}
          />
        </TouchableOpacity>
        <Text style={[styles.titleTab, {color: colorRenderTabs[Item.id - 1]}]}>
          {Item.title}
        </Text>
      </AnimatedView>
    );
  },
);
const styles = StyleSheet.create({
  viewTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  titleTab: {
    marginTop: 5,
  },
  btn: {
    padding: 10,
    paddingHorizontal: width / 12,
  },
});
