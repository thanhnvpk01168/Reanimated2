import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Header} from '../../Components/Header';
import {RenderItem} from './RenderItem';
import {colorRenderTabs, dataTab} from './Asset';
import {Tab1} from './Tab';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export function BottomTab({navigation}) {
  const [flatListTab, setFlatListTab] = useState();
  // start animation
  //blloons
  const animBlloons = useSharedValue(
    Dimensions.get('window').width / 4 / 2 - 50 / 2,
  );
  const animBlloonsStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animBlloons.value,
        },
      ],
    };
  });
  const startAnimBlloons = (value, index) => {
    setCheckedTab(index);
    animBlloons.value = withTiming(value, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };
  //end animation
  const [checkedTab, setCheckedTab] = useState(1);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
   
      <View style={styles.main}>
        <Header navigation={navigation} title={'animation 2'} />
        <AnimatedFlatList
          horizontal
          pagingEnabled
          scrollEnabled={false}
          ref={(e) => {
            setFlatListTab(e);
          }}
          data={['Trang chủ', 'Tìm kiếm', 'Thông báo', 'Cá nhân']}
          renderItem={({item, index}) => {
            return <Tab1 index={index} title={item} />;
          }}
          keyExtractor={(item, index) => `ScreenTab${index}`}
        />
        <View style={styles.container}>
          <AnimatedView
            style={[
              styles.viewLook,
              {
                backgroundColor: `${colorRenderTabs[checkedTab - 1]}`,
              },
              animBlloonsStyle,
            ]}
          />
          {dataTab.map((item, index) => {
            return (
              <RenderItem
                startAnimBlloons={startAnimBlloons}
                key={`bottomTab${index}`}
                Item={item}
                index={index}
                setCheckedTab={setCheckedTab}
                checkedTab={checkedTab}
                flatListTab={flatListTab}
              />
            );
          })}
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
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 46,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 100,
  },
  viewLook: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'white',
    top: -55 / 2,
    backgroundColor: 'green',
    zIndex: 2,
  },
});
