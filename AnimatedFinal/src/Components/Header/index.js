import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Ionicons} from '../../Assets/VectorIcons/Icons';
export function Header({navigation, title}) {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.viewBack}>
          <TouchableOpacity
            style={styles.touchBack}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name={'arrow-back-outline'}
              size={25}
              color={'rgba(255, 165, 1,1)'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewRight}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    overflow: 'hidden',
    paddingBottom: 5,
    // zIndex: 10,
  },
  container: {
    paddingBottom: 5,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  viewBack: {
    flex: 1,
    maxWidth: 50,
  },
  touchBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'rgba(255, 165, 0,1)',
  },
});
