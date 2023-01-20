import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Screen/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import LoginScreen from '../Screen/LoginScreen';
import ViewItemsScreen from '../Screen/ViewItemsScreen';

const Stack = createNativeStackNavigator();
const AppStack = () => {

  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen name="View Available Items" component={ViewItemsScreen} />
    </Stack.Navigator>
  );
};
export default AppStack;
