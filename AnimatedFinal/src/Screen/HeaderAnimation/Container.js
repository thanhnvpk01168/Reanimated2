import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';

import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {dataCharacters} from './Asset';
const WIDTH_SCREEN = Dimensions.get('screen').width;
export const Container = React.memo(({}) => {
  return (
    <View style={styles.main}>
      <FlatList
        data={dataCharacters}
        renderItem={({item, index}) => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize:17}}>{item}</Text>
            </View>
          );
        }}
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
