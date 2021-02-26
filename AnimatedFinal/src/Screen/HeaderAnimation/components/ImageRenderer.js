import React, {useRef} from 'react';
import { Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ImageRenderer = React.memo(({imageUrl}) => {
  const viewImageRef = useRef();
  const imageRef = useRef();
  return (
    <View
      style={{
        flex: 1,
        margin: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => console.log(viewImageRef.current)}>
        <Text>123123123</Text>
      </TouchableOpacity>
      <View
        pointerEvents="none"
        ref={viewImageRef}
        style={{
          width: 200,
          height: 200,
          borderWidth: 1,
          backgroundColor: 'gray',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      <FastImage
        ref={imageRef}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 150,
          height: 150,
          borderWidth: 1,
          borderColor: 'red',
        }}
        onLoadStart={() => {
          viewImageRef.current.setNativeProps({
            opacity: 0.5,
          });
        }}
        onLoad={() => {
          viewImageRef.current.setNativeProps({
            opacity: 0,
          });
        }}
        source={{uri: imageUrl}}
      />
    </View>
  );
});
