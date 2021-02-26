import React from 'react';
import {StyleSheet, StatusBar, View, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import {dataMovie} from './Asset';
import {RenderItem, RenderItemBackground} from './Components';
const {width, height} = Dimensions.get('screen');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const RenderCenter = ({style, item, index, children, ...props}) => {
  return (
    <View
      style={[
        {
          zIndex: dataMovie.length - index,
        },
      ]}>
      {children}
    </View>
  );
};
export function Movies({navigation}) {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.main}>
      <StatusBar hidden />

      <FlatList
        removeClippedSubviews={false}
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={dataMovie}
        CellRendererComponent={RenderCenter}
        renderItem={({item, index}) => {
          return (
            <RenderItemBackground
              length={dataMovie.length}
              item={item}
              index={index}
              scrollX={scrollX}
            />
          );
        }}
        keyExtractor={(item, index) => `cardImageBacground${index}`}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'white']}
        style={styles.linearGradient}></LinearGradient>
      <View style={styles.container}>
        <AnimatedFlatList
          removeClippedSubviews={false}
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          data={dataMovie}
          horizontal
          decelerationRate={0}
          snapToInterval={width / 2}
          onScroll={scrollHandler}
          renderItem={({item, index}) => {
            return (
              <RenderItem
                length={dataMovie.length}
                item={item}
                index={index}
                scrollX={scrollX}
              />
            );
          }}
          keyExtractor={(item, index) => `cardImage${index}`}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    position: 'absolute',
    bottom: -height / 10,
  },
  linearGradient: {
    width: '100%',
    height: '65%',
    position: 'absolute',
    bottom: 0,
  },
});
