import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const authcontext = createContext();

export const AuthenticationProvider=({children})=> {
    const [user,setuser]= useState(null);
    return(
        <authcontext.Provider
        value={{user,setuser, login:async()=>{
            try{
                auth().signInWithEmailAndPassword(email,password);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        register: async(email,password)=>{
            try{
            await auth().createUserWithEmailAndPassword(email,password);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        logout:async ()=> {
            try{
                await auth().signOut();
            }
            catch{
                console.log(e);
            }
        }}}>
            {children}
        </authcontext.Provider>
    )
}
