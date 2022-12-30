import react from "react";
import {View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { withSafeAreaInsets } from "react-native-safe-area-context";
const OnboardingScreen =({navigation})=>{
   return (
    <LinearGradient
   
        colors={['#071629', '#ffffff']}
        style={styles.container}
        start={{ x: 1, y:0 }}
        end={{ x: 6, y:2 }}
      >
           <Image source = {require('../Assets/Logo-White.png')} style = {{ width: 250, height: 250 }}/>
           <TouchableOpacity
        onPress={() => navigation.navigate('SelectionScreen') }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Start   
        <MaterialIcons 
        name="arrow-forward-ios"
        color={'#071629'}
        size={25}
        />
        </Text>
       

        </TouchableOpacity>
      </LinearGradient>
   )
}

export default OnboardingScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      elevation: 8,
    backgroundColor: "#cccccc",
    top:100,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25
    },
    buttonText:{
      fontSize: 35,
    color: "#071629",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    }
  })