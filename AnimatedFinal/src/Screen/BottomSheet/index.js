import React, {useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header} from '../../Components/Header';

export const TestBottomSheet = ({navigation}) => {
  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const snapPoints = useMemo(() => [-1, '50%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    if (index == 0) {
      sheetRef.current?.close();
    }
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <Header navigation={navigation} title={'animation 8'} />
      <View style={styles.container}>
        <View style={styles.viewOpenSheet}>
          <TouchableOpacity
            style={styles.btnOpenSheet}
            onPress={() => handleSnapPress(2)}>
            <Text style={styles.openSheet}>Open </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        style={{zIndex: 100,marginTop:100,paddingBottom:10}}
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        onChange={handleSheetChange}>
        <BottomSheetFlatList
          data={data}
          // onEndReached={() => {
          //   alert('het');
          // }}
          // onEndReachedThreshold={0.5}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  viewOpenSheet: {
    alignItems: 'center',
  },
  btnOpenSheet: {
    minWidth: '80%',
    height: 30,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openSheet: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
