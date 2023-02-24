import React from "react";
import {View, Text, Image, TouchableOpacity,TextInput, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const UndateUserProfile =({navigation}) =>{
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          width: 1200,
          height: 780,
          cropping: true,
        }).then(image => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };

    return (
        <View style={{backgroundColor:'#fff',flex: 1,
        alignItems: 'center',}}>
            <Image
        source={require('../Assets/testImage.jpg')}
        style={{width: 150, height: 150,top:60,borderRadius:40}}
      />
      <TouchableOpacity
                style={styles.buttonStyle}
                onPress={takePhotoFromCamera}>
                <View style={{top: 3}}>
                  <FontAwesome name="plus" color="#fff" size={20} />
                </View>
              </TouchableOpacity>
              {/* Value fields */}
              <View style={{flexDirection:'row',top:100}}>
        <Text style={{fontSize:18}}>Email </Text> 
            <View style={{left:20}}>
          <FontAwesome name="envelope-o" color="#05375a" size={23} /></View>
          <View style={{left:20,top:-8}}>
          <TextInput
            placeholder="Your Email.............................................."
            autoCapitalize="none"
            onChangeText={(val)=>{textInputChange(val); setEmail(val)}}
          /></View>
        </View>

        <View style={{flexDirection:'row',top:100}}>
        <Text style={{fontSize:18}}>Name </Text> 
            <View style={{left:20}}>
          <FontAwesome name="user-o" color="#05375a" size={23} /></View>
          <View style={{left:20,top:-8}}>
          <TextInput
            placeholder="Your Email.............................................."
            autoCapitalize="none"
            onChangeText={(val)=>{textInputChange(val); setEmail(val)}}
          /></View>
        </View>

        <View style={{flexDirection:'row',top:100}}>
        <Text style={{fontSize:18,left:4}}>Location </Text> 
            <View style={{left:10}}>
          <FontAwesome name="map-marker" color="#05375a" size={23} /></View>
          <View style={{left:10,top:-8}}>
          <TextInput
            placeholder="Your Email.............................................."
            autoCapitalize="none"
            onChangeText={(val)=>{textInputChange(val); setEmail(val)}}
          /></View>
        </View>
        <View style={{flexDirection:'row',top:100}}>
        <Text style={{fontSize:18,left:0}}>Contact </Text> 
            <View style={{left:10}}>
          <FontAwesome name="mobile" color="#05375a" size={25} /></View>
          <View style={{left:16,top:-8}}>
          <TextInput
            placeholder="Your Email.............................................."
            autoCapitalize="none"
            onChangeText={(val)=>{textInputChange(val); setEmail(val)}}
          /></View>
        </View>
        <TouchableOpacity style={styles.submitStyle}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>
                Update
              </Text>
            </TouchableOpacity>
            <View style={{top:20}}>
            <TouchableOpacity style={styles.submitStyle} onPress={() => navigation.navigate('Profile')}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>
                Cancel
              </Text>
            </TouchableOpacity></View>
        </View>
       
        
    )
}
export default UndateUserProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#071629',
    },
    header: {
      flex: 2,
      justifyContent: 'center',
    },
    header_Text: {
      fontSize: 60,
      color: '#fff',
      left: 10,
      top: 20,
    },
    footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 20,
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
    submitStyle: {
        backgroundColor: '#071629',
        top: 130,
        width:240,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
    footer_text: {
      fontSize: 18,
    },
    TextInput: {
      flex: 1,
      alignItems:'flex-start',
      paddingLeft: 40,
      fontSize: 30,
      color: '#05375a',
    },
    eyeslach:{
      alignItems:'flex-start',
      top:-50,
      left:320
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
  
    title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold',
    },
   
    text: {
      color: 'grey',
      marginTop: 2,
      margineEnd: 5,
      fontSize: 25,
    },
    signIn: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 10,
      left: 110,
      flexDirection: 'row',
    },
    TextInput: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 17,
      color: '#000000',
  
      fontFamily: 'Roboto-Medium',
    },
    textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#05375a',
        width: 35,
        height: 35,
        borderRadius: 30,
        top: 30,
        left: 60,
        padding: 5,
        shadowColor: '#9f9393',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
      },
    
  });