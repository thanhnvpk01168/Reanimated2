import React, {useState, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export const ModalScreen = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>Test</Text>
        <Button title="Show modal" onPress={toggleModal} />
        <Modal
          // animationIn="zoomInDown"
          //         animationOut="zoomOutUp"
          //         animationInTiming={600}
          //         animationOutTiming={600}
          //         backdropTransitionInTiming={600}
          //         backdropTransitionOutTiming={600}
          //end

          useNativeDriver={true}
          backdropOpacity={1}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          onBackButtonPress={() => {
            setModalVisible(false);
          }}
          isVisible={isModalVisible}
          backdropColor={'rgba(111,0,0,.5)'}>
          <View style={{flex: 1, backgroundColor: 'white', padding: 40}}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
