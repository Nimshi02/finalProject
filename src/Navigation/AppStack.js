import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Screen/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import LoginScreen from '../Screen/LoginScreen';
import ViewItemsScreen from '../Screen/ViewItemsScreen';
import Forum from '../Screen/Forum';
import AddPostScreen from '../Screen/AddPostScreen';
import DonateScreen from '../Screen/DonateScreen';
import AddDonationScreen from '../Screen/AddDonationScreen';

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

       <Stack.Screen name="Forum" component={Forum} />
       <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
       <Stack.Screen name="Donate Screen" component={DonateScreen} />
       <Stack.Screen name="Add Donation Screen" component={AddDonationScreen} />
    </Stack.Navigator>
  );
};
export default AppStack;
