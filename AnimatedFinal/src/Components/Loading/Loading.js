import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export function Loading() {
  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" color={'rgba(255, 165, 0,1)'} />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
