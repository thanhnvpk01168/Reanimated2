import React, {useEffect} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/Navigation/AppNavigation';
import {StatusBar} from 'react-native';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    // <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(255, 165, 0,1)'}}>
    // <SafeAreaProvider>
    <>
      <StatusBar translucent backgroundColor={'rgba(255, 165, 0,1)'} />
      <StoreProvider store={store}>
        <AppNavigation />
      </StoreProvider>
    </>
    // </SafeAreaProvider>
    // </SafeAreaView>
  );
}

export default App;
