import React, {useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Header} from '../../Components/Header';
import {Slide} from './Components';

export const SlideScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center',marginVertical:5}}>
          <Text>Header</Text>
        </View>
        <Slide />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
