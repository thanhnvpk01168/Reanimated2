import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';

import {Header} from '../../Components/Header';
import {dataCard} from './Asset';
import {RenderItem} from './Components';
const {width, height} = Dimensions.get('screen');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export function Card1({navigation}) {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <Header navigation={navigation} title={'animation 6'} />
        <View style={styles.container}>
          <AnimatedFlatList
            bounces={false}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={dataCard}
            onScroll={scrollHandler}
            renderItem={({item, index}) => {
              return <RenderItem item={item} index={index} scrollY={scrollY} />;
            }}
            keyExtractor={(item, index) => `cardImage${index}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
