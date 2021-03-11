import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function Modal1() {
  return (
    <View style={[styles.main, {position: 'absolute'}]}>
      <TouchableOpacity style={[styles.main]}>
        <ActivityIndicator size="large" color={'rgba(255, 165, 0,1)'} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'blue',
  },
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'blue',
  },
});
