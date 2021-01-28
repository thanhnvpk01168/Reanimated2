import React, {useState, useEffect} from 'react';
import {StyleSheet,  View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Header} from '../../Components/Header';
import {Loading} from '../../Components/Loading';
import FastImage from 'react-native-fast-image';

const AnimatedView = Animated.createAnimatedComponent(View);

export function PanGestureHandlerScreen({navigation}) {
  const [WIDTH_HEIGHT, setWIDTH_HEIGHT] = useState({
    w: 0,
    h: 0,
  });
  const _find_dimesions = (layout) => {
    const {x, y, width, height} = layout;
    setWIDTH_HEIGHT({w: width, h: height});
  };
  //start rotate dragon
  const rotateDragon = useSharedValue(0);

  const animationDragonStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: rotateDragon.value + 'deg'}],
    };
  });
  //panGestureHandle
  const x = useSharedValue(WIDTH_HEIGHT.w / 4);
  const y = useSharedValue(WIDTH_HEIGHT.h / 2 - 50);
  const gestureHandle = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = x.value;
      context.startY = y.value;
    },
    onActive: (event, context) => {
      x.value = withSpring(context.startX + event.translationX);
      y.value = withSpring(context.startY + event.translationY);
    },
    onEnd: (_) => {
      let abc = 0;
      if (x.value < 0) {
        abc = 0;
      } else if (WIDTH_HEIGHT.w - 100 > x.value) {
        abc = x.value;
      } else {
        abc = WIDTH_HEIGHT.w - 100;
      }
      let abcd = 0;
      if (y.value < 0) {
        abcd = 0;
      } else if (WIDTH_HEIGHT.h - 100 > y.value) {
        abcd = y.value;
      } else {
        abcd = WIDTH_HEIGHT.h - 100;
      }
      x.value = abc;
      y.value = abcd;
    },
  });
  const gestureHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });
  useEffect(() => {
    rotateDragon.value = withRepeat(
      withTiming(360, {
        duration: 6000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <Header navigation={navigation} title={'animation 1'} />
        <View
          style={{flex: 1}}
          onLayout={(event) => {
            _find_dimesions(event.nativeEvent.layout);
          }}>
          <PanGestureHandler onGestureEvent={gestureHandle}>
            <AnimatedView style={[styles.box, gestureHandleStyle]}>
              <AnimatedView style={[styles.viewRotate, animationDragonStyle]}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={[
                    styles.dragon,
                    {top: 0, right: 0, transform: [{rotate: '50deg'}]},
                  ]}
                  source={require('../../Assets/Images/running_doraemon.gif')}
                />
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={[
                    styles.dragon,
                    {top: 0, left: 0, transform: [{rotate: '-30deg'}]},
                  ]}
                  source={require('../../Assets/Images/running_doraemon.gif')}
                />
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={[
                    styles.dragon,
                    {bottom: 0, right: 0, transform: [{rotate: '150deg'}]},
                  ]}
                  source={require('../../Assets/Images/running_doraemon.gif')}
                />
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={[
                    styles.dragon,
                    {bottom: 0, left: 0, transform: [{rotate: '-130deg'}]},
                  ]}
                  source={require('../../Assets/Images/running_doraemon.gif')}
                />
              </AnimatedView>

              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.imgDoraemon}
                source={require('../../Assets/Images/doraemon.jpeg')}
              />
            </AnimatedView>
          </PanGestureHandler>
        </View>
        {WIDTH_HEIGHT.w == 0 ? <Loading /> : null}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 165, 0,1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  imgDoraemon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
  },
  viewRotate: {
    zIndex: 1,
    position: 'absolute',
    height: 190,
    width: 190,
  },
  dragon: {
    width: 70,
    height: 70,
    position: 'absolute',
  },
});
