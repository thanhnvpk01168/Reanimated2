import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {PlayMusic} from '../../../redux/action';

import {AntDesign, Fontisto} from '../../../Assets/VectorIcons/Icons';
import {ProgressBar} from './ProgressBar';

const AnimatedView = Animated.createAnimatedComponent(View);
const WIDTH_SCREEN = Dimensions.get('screen').width;
export function Main({navigation}) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  //end redux
  const [startMusic, setStartMusic] = useState({
    status: true,
    isLoading: false,
  });
  //animation view under
  const animViewUnder = useSharedValue(0);
  const animViewUnderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animViewUnder.value,
        },
      ],
    };
  });
  const startAnimViewUnder = (value, checkEvent) => {
    if (startMusic.status) {
      setStartMusic({status: false, isLoading: checkEvent});
      animViewUnder.value = withTiming(value, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
      if (checkEvent) {
        TrackPlayer.play();
        animImageScale.value = withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        });
        animImageRotate.value = withRepeat(
          withTiming(360, {
            duration: 2000,
            easing: Easing.linear,
          }),
          -1,
        );
      } else {
        TrackPlayer.pause();
        animImageScale.value = withTiming(0.85, {
          duration: 500,
          easing: Easing.linear,
        });
        animImageRotate.value = withTiming(0, {
          duration: 150,
          easing: Easing.linear,
        });
      }
      setStartMusic({status: true, isLoading: checkEvent});
      dispatch(PlayMusic(checkEvent));
    }
  };
  //animation Image Rotate
  const animImageRotate = useSharedValue(0);
  const animImageScale = useSharedValue(0.85);

  const animImageRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: animImageRotate.value + 'deg'},
        {scale: animImageScale.value},
      ],
    };
  });
  useEffect(() => {
    if (store.isPlaying) {
      animImageScale.value = withTiming(1, {
        duration: 1000,
        easing: Easing.linear,
      });
      animImageRotate.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }
  }, []);

  return (
    <View style={styles.main}>
      <AnimatedView style={[styles.viewContent, animViewUnderStyle]}>
        <View style={styles.viewContent1}>
          <TouchableOpacity
            onPress={() => {
              // let state = await TrackPlayer.getState();

              // let trackId = await TrackPlayer.getCurrentTrack();
              // let trackObject = await TrackPlayer.getTrack(trackId);

              // // Position, buffered position and duration return values in seconds
              // let position = await TrackPlayer.getPosition();
              // let buffered = await TrackPlayer.getBufferedPosition();
              // let duration = await TrackPlayer.getDuration();
            }}>
            <Text numberOfLines={2}>
              72 PHÉP THẦN THÔNG - NGÔ KIẾN HUY x YUNO BIGBOI x MASEW
            </Text>
          </TouchableOpacity>
          <ProgressBar />
        </View>
      </AnimatedView>
      <View style={styles.container}>
        <View style={styles.viewFlex1}>
          <AnimatedView style={[styles.viewImage, animImageRotateStyle]}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.img}
              source={require('../../../Assets/Images/music.jpg')}
            />
          </AnimatedView>
        </View>
        <View style={styles.viewFlex2}>
          <TouchableOpacity onPress={() => {}}>
            <AntDesign
              name={'banckward'}
              size={24}
              color={'rgb(128,128,128)'}
            />
          </TouchableOpacity>
          {!store.isPlaying ? (
            <TouchableOpacity
              onPress={() => startAnimViewUnder(0, !store.isPlaying)}>
              <AntDesign
                name={'caretright'}
                size={24}
                color={'rgb(128,128,128)'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => startAnimViewUnder(70, !store.isPlaying)}>
              <Fontisto name={'pause'} size={24} color={'rgb(128,128,128)'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name={'forward'} size={24} color={'rgb(128,128,128)'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: WIDTH_SCREEN - 75,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewFlex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFlex2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewImage: {
    width: (WIDTH_SCREEN - 75) / 3.2,
    height: (WIDTH_SCREEN - 75) / 3.2,
    backgroundColor: 'pink',
    borderRadius: (WIDTH_SCREEN - 75) / 4,
    position: 'absolute',
    top: -40,
  },
  img: {
    width: (WIDTH_SCREEN - 75) / 3.2,
    height: (WIDTH_SCREEN - 75) / 3.2,
    borderRadius: (WIDTH_SCREEN - 75) / 4,
    borderWidth: 5,
    borderColor: 'rgba(255, 165, 0,1)',
  },
  viewContent: {
    width: WIDTH_SCREEN - 100,
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.7)',
    // position: 'absolute',
    // top: -70,
    justifyContent: 'center',
    borderRadius: 5,
  },
  viewContent1: {
    width: WIDTH_SCREEN - 100,
    paddingLeft: WIDTH_SCREEN / 3.5,
  },
});
