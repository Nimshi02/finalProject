import react, { useState,useContext,useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { authcontext } from '../Navigation/AuthenticationProvider';
const Profile = ({navigation}) => {
  const [about,setAbout]=useState(null);
  const[userName,setUserName]=useState(null);
  const[userImg,setImage]=useState(null);
  const {user, logout} = useContext(authcontext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      

      await firestore()
        .collection('users')
        .where('userId','==',user.uid)
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {
              about,
              userName,
              userImg,
            } = doc.data();
              setAbout(about);
              setUserName(userName);
              setImage(userImg);
          });
        });


      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      {userImg != null ? (
                <Image source={{uri: userImg}} style={{width: 150, height: 150,top:-60,borderRadius:90}}/>
              ) : (
                   <Image source={require('../Assets/testImage.jpg')}
                  style={{width: 150, height: 150,top:-60,borderRadius:90}}/>
              )}
      <Text style={{textAlign:'center',fontSize:25}}>{userName}</Text>
      <Text style={{padding:18,fontSize:20}}>{about}</Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("UpdateUserProfile")}><Text style={{color:'#071629'}}>Update profile</Text></TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={()=> logout()}><Text style={{color:'#071629'}}>logout</Text></TouchableOpacity>

      </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  button: {
    position:'absolute',
    backgroundColor: '#fff',
    width:150,
    height:45,
     top: 550,
     left:50,
    borderWidth:2,
    alignSelf:'center',
    borderColor:'#071629',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  logoutButton: {
    position:'absolute',
    backgroundColor: '#fff',
    width:100,
    height:45,
     top: 550,
     left:240,
    borderWidth:2,
    alignSelf:'center',
    borderColor:'#071629',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 35,
    color: '#071629',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
