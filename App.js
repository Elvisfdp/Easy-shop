import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';


//Navigations
import Main from './Navigators/Main'

//Screens
import Header from './Shared/Header';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Header/>
          <Main/>
      </NavigationContainer>
    </Provider>
    
    
  );
}
