import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

import {colorRenderTabs} from '../Asset';

export const Tab1 = React.memo(({title, index}) => {
  console.log("111111111")
  return (
    <View
      style={[
        styles.main,
        {backgroundColor: colorRenderTabs[index]},
        {transform: [{translateY: -5}]},
      ]}>
      <Text style={{color:'white',fontSize:20}}>{title}</Text>
    </View>
  );
});
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    zIndex: 1,
  },
});
