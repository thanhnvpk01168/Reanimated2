import React, {useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import {Header} from '../../Components/Header';

import {track} from './Asset';
import {Main} from './Components/Main';
let startTimeInterval;
export function MusicScreen({navigation}) {
  useEffect(() => {
    // TrackPlayer.setupPlayer().then(() => {});
    TrackPlayer.add([track]).then(function () {});
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={styles.main}>
        <Header navigation={navigation} title={'animation 4'} />
        <Main />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgb(252, 239, 247)',
  },
});
