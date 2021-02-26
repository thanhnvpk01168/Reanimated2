import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {dataCharacters} from './Asset';
const WIDTH_SCREEN = Dimensions.get('screen').width;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
let isPosition = {is: -11, y: 0};
var refFlatList;
export const Container = React.memo(({scrollY}) => {
  var thisScroll = 0;
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      thisScroll = event.contentOffset.y;
      if (event.contentOffset.y <= 101) {
        scrollY.value = event.contentOffset.y;
      }
    },
  });
  return (
    <View style={styles.main}>
      <AnimatedFlatList
        ref={(e) => {
          refFlatList = e;
        }}
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        data={dataCharacters}
        onScrollBeginDrag={() => {
          console.log('onScrollBeginDrag::::' + thisScroll);

          if (scrollY.value < 70) {
            isPosition = {is: 0, y: thisScroll};
          } else {
            isPosition = {is: 1, y: thisScroll};
          }
        }}
        onScrollEndDrag={() => {
          console.log('onScrollEndDrag::::' + thisScroll);          
        }}
        onMomentumScrollEnd={() => {
          console.log('endddddd::::' + scrollY.value);
          if (scrollY.value <= 70) {
            if (isPosition.is == 0) {
              if (isPosition.y < scrollY.value) {
                if (scrollY.value <= 70) {
                  if (refFlatList) {
                    refFlatList.scrollToOffset({
                      animated: true,
                      offset: 70,
                    });
                  }
                } else {
                  if (refFlatList) {
                    refFlatList.scrollToOffset({
                      animated: true,
                      offset: scrollY.value,
                    });
                  }
                }
              } else {
                if (refFlatList) {
                  refFlatList.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }
              }
            } else {
              if (refFlatList) {
                refFlatList.scrollToOffset({
                  animated: true,
                  offset: 0,
                });
              }
            }
          } else {
            if (isPosition.is == 0) {
              if (refFlatList) {
                refFlatList.scrollToOffset({
                  animated: true,
                  offset: 70,
                });
              }
            }
          }
        }}
        renderItem={({item, index}) => {
          return (
            <>
              {index == 0 ? <View style={{marginTop: 70}}></View> : null}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <Text style={{fontSize: 17}}>{item}</Text>
              </View>
            </>
          );
        }}
        onScroll={scrollHandler}
        keyExtractor={(item, index) => `character${index}`}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  img: {
    width: WIDTH_SCREEN,
    height: WIDTH_SCREEN,
  },
});
