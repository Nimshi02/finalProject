import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const authcontext = createContext();

export const AuthenticationProvider=({children})=> {
    const [user,setuser]= useState(null);
    return(
        <authcontext.Provider
        value={{user,setuser, 
            login:async(email,password)=>{
            try{
                auth().signInWithEmailAndPassword(email,password);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        register: async(email, password,address,userName,phone)=>{
            try{
              await auth().createUserWithEmailAndPassword(email, password)
              .then(async() => {
                console.log("Success");
                firestore()
                .collection('users')
                .add({
                  userId:auth().currentUser.uid,
                  email:email,
                  location:address,
                  userName:userName,
                  contact:phone,
                  userImg:"",
                  about: "Hero Who save the food!"
                })
                //ensure we catch any errors at this stage to advise us if something does go wrong
                .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                  console.log('Something went wrong with sign up: ', error);
              });
            } catch (e) {
              console.log(e);
            }
        },
        logout:async ()=> {
            try{
                await auth().signOut()
            }
            catch{
                console.log(e);
            }
        }}}>
            {children}
        </authcontext.Provider>
    )
}
