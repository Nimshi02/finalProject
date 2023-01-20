import react from "react";
import {View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Onboarding from 'react-native-onboarding-swiper';
import { Button } from "@material-ui/core";
const OnboardingScreen =({navigation})=>{

   return (
    <Onboarding
        onSkip={()=>navigation.replace("SelectionScreen")}
        onDone={()=>navigation.navigate("SelectionScreen")}
        pages={[
          {
            backgroundColor: '#d9b7a5',
            image: <Image source={require('../Assets/onboarding-img1.png')} style={{width: 350, height: 200,}} />,
            title: 'Manage Food',
            subtitle: 'Manage food items in the home',
          },
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../Assets/onboarding-img2.png')} style={{width: 350, height: 200,}} />,
            title: 'Share Food',
            subtitle: 'Donate the food to every one',
          },
          {
            backgroundColor: '#e9bcbe' ,
            image: <Image source={require('../Assets/onboarding-img3.png')} style={{width: 250, height: 250,}} />,
            title: 'Save Food',
            subtitle: 'Use App to share food and be a hero',
          },
    ]}
  />
   
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