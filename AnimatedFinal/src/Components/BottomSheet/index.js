import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {Ionicons} from '../../Assets/VectorIcons/Icons';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('screen');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export function BottomSheet({navigation, show, setShow}) {
  var abc = 1;
  const [wh_view, set_wh_view] = useState({w: 0, h: 0});
  const refFlatList = useRef();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log(event.contentOffset.y);
      console.log()
      if (show && event.contentOffset.y <= 10) {
        abc = 100;
        console.log('vao roi day');
        // setShow(false);
        // refFlatList.current.scrollToOffset({
        //   animated: true,
        //   offset: 0,
        // });
      }
    },
  });

  useEffect(() => {
    console.log('zeof 456');
    if (show) {
      refFlatList.current.scrollToOffset({
        animated: true,
        offset: wh_view.h,
      });
    }
  }, [show]);
  useEffect(() => {
    alert('vao roi nha');
  }, [abc]);
  console.log('zeof 123');

  return (
    <View pointerEvents={show ? 'auto' : 'none'} style={styles.main}>
      <SafeAreaView style={styles.container}>
        <View
          onLayout={(event) => {
            let {x, y, width, height} = event.nativeEvent.layout;
            set_wh_view({w: width, h: height});
          }}
          style={{flex: 1}}>
          <AnimatedFlatList
            onScrollEndDrag={() => {}}
            ref={refFlatList}
            data={[1, 2]}
            pagingEnabled
            removeClippedSubviews={false}
            bounces={false}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            onScroll={scrollHandler}
            renderItem={({item, index}) => {
              return (
                <View
                  pointerEvents={index == 0 ? 'none' : 'auto'}
                  style={[
                    styles.viewItem,
                    {
                      minWidth: wh_view.w,
                      minHeight: wh_view.h,
                      backgroundColor: index % 2 == 0 ? 'red' : 'blue',
                      opacity: index == 0 ? 0 : 0.6,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      (abc = 1000), alert('t');
                      refFlatList.current.scrollToOffset({
                        animated: true,
                        offset: 0,
                      });
                    }}>
                    <Text style={{color: 'red'}}>{index + ' bbbb'}</Text>
                    <Text style={{color: 'red'}}>{index + ' bbbb'}</Text>
                    <Text style={{color: 'red'}}>{index + ' bbbb'}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => `bottomSheet${index}`}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    width,
    height,
    top: 0,
  },
  container: {
    flex: 1,
  },
  viewItem: {
    borderBottomWidth: 5,
  },
});
