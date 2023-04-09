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
            //Login the user
            login:async(email,password)=>{
            try{
                auth().signInWithEmailAndPassword(email,password);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        //Register new user
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
                .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                })
              })
              .catch(error => {
                  console.log('Something went wrong with sign up: ', error);
              });
            } catch (e) {
              console.log(e);
            }
        },
        //Logged out the user
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
