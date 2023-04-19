import React, { useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image,Text,View } from 'react-native';

import HomeScreen from '../Screen/HomeScreen';
import ViewItemsScreen from '../Screen/ViewItemsScreen';
import Forum from '../Screen/Forum';
import AddPostScreen from '../Screen/AddPostScreen';
import DonateScreen from '../Screen/DonateScreen';
import ViewCommunityItems from '../Screen/ViewCommunityItems';
import ViewShoppingList from '../Screen/ViewShoppingList';
import profile from '../Screen/profile';
import UpdateUserProfile from '../Screen/UpdateUserProfile';
import viewRestuarentsItems from '../Screen/ViewRestaurentsItems';
import ViewRecipes from '../Screen/ViewRecipes';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = () => {
  return (
    <View style={{flexDirection:"row"}}>
       <Image
      style={{ width: 40, height:40 }}
      source={require('../Assets/Logo-Blue.png')}
    /><Text style={{marginTop:8, marginLeft:10, fontSize:18,color:'#071629',fontWeight:'bold'}}>UseFood</Text>
    </View>
   
  );
};

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
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold'
        },
        headerTintColor: '#071629',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
       <Stack.Screen name="View Discounts" component={viewRestuarentsItems} options={{
         headerTitle: "View Disocunts" ,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold'
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#071629',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Stack.Screen name="View Recipes" component={ViewRecipes} options={{
        headerTitle: 'Available Items',
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#071629',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    <Stack.Screen name="Donate Screen" component={DonateScreen} options={{
      headerTintColor: '#071629',
        headerTitle: 'Donations',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold'
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}/>
    <Stack.Screen name="Community Items" component={ViewCommunityItems} options={{
      headerTintColor: '#071629',
        headerTitle: 'Community Items',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold'
        },
        headerStyle: {
          backgroundColor: '#fff',
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
      headerTintColor: '#071629',
        headerTitle: 'Forum',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold',
        },
        headerStyle: {
          backgroundColor: '#fff',
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
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold',
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={profile}
      options={{
        headerTitle: 'Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold',
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',

          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="UpdateUserProfile"
      component={UpdateUserProfile}
      options={{
        headerTitle: 'Update Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#071629',
          fontSize: 30,
          fontWeight:'bold',
        },
        headerStyle: {
          backgroundColor: '#fff',
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
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    
    
  );
};

 export default AppStack;


