import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {arrayScreens} from './Asset';

export function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Some animation</Text>
        </View>
        <FlatList
          data={arrayScreens}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)}>
                <View style={styles.viewItem}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `home${index}`}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewItem: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(128,128,128,0.4)',
  },
});
