/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthStack from './src/Navigation/AuthStack';




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const App =() => {
  return (
    <NavigationContainer>
       <AuthStack/>
    </NavigationContainer>
  )
}
export default App;
