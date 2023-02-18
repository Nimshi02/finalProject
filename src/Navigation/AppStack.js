import React, { useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Screen/HomeScreen';
import ViewItemsScreen from '../Screen/ViewItemsScreen';
import Forum from '../Screen/Forum';
import AddPostScreen from '../Screen/AddPostScreen';
import DonateScreen from '../Screen/DonateScreen';
import ViewCommunityItems from '../Screen/ViewCommunityItems';
import AddCommunityItem from '../Screen/AddCommunityItem';
import ViewShoppingList from '../Screen/ViewShoppingList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="View Available Items" component={ViewItemsScreen} options={{
      headerTintColor: '#fff',
        headerTitle: 'Available Items',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: '#071629',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
    <Stack.Screen name="Donate Screen" component={DonateScreen} options={{
      headerTintColor: '#fff',
        headerTitle: 'Donations',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: '#071629',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
    <Stack.Screen name="Community Items" component={ViewCommunityItems} options={{
      headerTintColor: '#fff',
        headerTitle: 'Community Items',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: '#071629',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
    <Stack.Screen name="Add Item To Community" component={AddCommunityItem} options={{
      headerTintColor: '#fff',
        headerTitle: 'Add Community Item',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: '#071629',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
  </Stack.Navigator>
);

const ForumStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Forum" component={Forum} 
    options={{
        headerTitle: 'Forum',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: '#071629',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
    <Stack.Screen name="AddPostScreen" component={AddPostScreen} 
     options={{headerTitle: 'Add Post'}}
    />
    
  </Stack.Navigator>
);

const CartStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Shopping list"
      component={ViewShoppingList}
      options={{
        headerTitle: 'Shopping List',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: '#071629',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#071629',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={() => ({
          tabBarLabel: 'Home',
          headerShown: false,
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Forum"
        component={ForumStack}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Shopping list"
        component={CartStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
