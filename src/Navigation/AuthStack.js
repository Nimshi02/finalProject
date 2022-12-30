import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Screen/HomeScreen';
import OnboardingScreen from '../Screen/OnboardingScreen';
import LoginScreen from '../Screen/LoginScreen';
import SelectionScreen from '../Screen/SelectionScreen'
import ViewItemsScreen from '../Screen/ViewItemsScreen';
import ViewRecipes from '../Screen/ViewRecipes';
import ViewRestaurentsItems from '../Screen/ViewRestaurentsItems';
import ViewShoppingList from '../Screen/ViewShoppingList';
import SignUpScreen from '../Screen/SignUpScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
     <Stack.Screen
        name="SelectionScreen"
        component={SelectionScreen}
        options={{headerShown: false}}
      /> 
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Available Items" component={ViewItemsScreen} />
    </Stack.Navigator>
  );
};
export default AuthStack;
