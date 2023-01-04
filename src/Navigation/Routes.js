import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {authcontext} from './AuthenticationProvider';
import auth from '@react-native-firebase/auth';


import AuthStack from './AuthStack';
import AppStack from './AppStack';




const Routes =() => {

const {user,setuser} = useContext(authcontext);
const [initializing, setInitializing] = useState(true);

const onAuthStateChanged=(user)=>{
    setuser(user);
    if(initializing) setInitializing(false);
}
useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
     {user? <AppStack/> : <AuthStack/>}  
    </NavigationContainer>
  )
}
export default Routes;