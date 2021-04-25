import React from 'react';
import {Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../Screen/Home';
import {PanGestureHandlerScreen} from '../Screen/PanGestureHandler';
import {BottomTab} from '../Screen/BottomTab';
import {HeaderAnimation} from '../Screen/HeaderAnimation';
import {MusicScreen} from '../Screen/Music';
import {Heart} from '../Screen/Heart';
import {Card1} from '../Screen/Card1';
import {Movies} from '../Screen/Movies';
import {TestBottomSheet} from '../Screen/BottomSheet';
import {SlideScreen} from '../Screen/Slide';
import {ModalScreen as Modal} from '../Screen/Modal';
import {Test} from '../Screen/Test';
import {Chart} from '../Screen/Chart';
import {Loading1} from '../Screen/Loading1';
import {Loading2} from '../Screen/Loading2';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="PanGestureHandlerScreen"
          component={PanGestureHandlerScreen}
        />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="HeaderAnimation" component={HeaderAnimation} />
        <Stack.Screen name="MusicScreen" component={MusicScreen} />
        <Stack.Screen name="Heart" component={Heart} />
        <Stack.Screen name="Card1" component={Card1} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="BottomSheet" component={TestBottomSheet} />
        <Stack.Screen name="SlideScreen" component={SlideScreen} />
        <Stack.Screen name="Modal" component={Modal} />
        <Stack.Screen name="Chart" component={Chart} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Loading1" component={Loading1} />
        <Stack.Screen name="Loading2" component={Loading2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
