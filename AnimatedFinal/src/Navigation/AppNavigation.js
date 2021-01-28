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
import {Test} from '../Screen/Test';

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
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
