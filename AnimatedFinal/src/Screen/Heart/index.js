import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ItemHeart} from './Components';
import {Header} from '../../Components/Header';

export function Heart({navigation}) {
  const [arrayHeart, setArrayHeart] = useState([1]);
  const _addHeart = () => {
    setArrayHeart([...arrayHeart, 1]);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <Header navigation={navigation} title={'animation 5'} />
        <View style={styles.container}>
          {arrayHeart.map((item, index) => {
            return (
              <ItemHeart key={`heart${index}`} item={item} index={index} />
            );
          })}
          <TouchableOpacity onPress={() => _addHeart()}>
            <View style={styles.viewPush}>
              <Text style={styles.push}>push</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgb(252, 239, 247)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewPush: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  push: {
    color: 'white',
    fontWeight: 'bold',
  },
});
