import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {InputField, InputWrapper} from '../Styles/AddPostStyle';
import {StyleSheet,View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddPostScreen=({navigation}) =>{
 

    return (
       <InputWrapper>
       <InputField
       placeholder="Whats on your mind?"
       multiline
        numberOfLines={4}
/>
           <View style={{top:220, left:120}}>
           <TouchableOpacity style={styles.buttonStyle}><Text>Hello</Text></TouchableOpacity>
           </View>
           <View style={{top:220, left:120}}>
           <TouchableOpacity style={styles.buttonStyle}><Text>Hello</Text></TouchableOpacity>
           </View>
           <View style={{top:220, left:120}}>
           <TouchableOpacity style={styles.buttonStyle}><Text>Hello</Text></TouchableOpacity>
           </View>
       </InputWrapper>
       
    )
}
export default AddPostScreen;

const styles = StyleSheet.create({
    buttonStyle: {
    //     
    //     backgroundColor: '#000',
    //     
        borderRadius: 30,
      
        padding: 5,
        shadowColor: "#9f9393",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
        backgroundColor:'#fff',
        width: 60,
         height: 60,
},
  });
