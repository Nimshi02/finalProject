import react, { useContext } from 'react';
import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
//import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { authcontext } from '../Navigation/AuthenticationProvider';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(authcontext);
  const [email,setEmail]=useState();
const[password,setPassword]=useState();
  const [data, setdata] = react.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const PasswordChange =(val)=>{
    setdata({
        ... data,
        passwor:val,
    });
  };
const updateSecureTextEntry=()=>{
    setdata({
        ... data,
        secureTextEntry:!data.secureTextEntry
    })
}
  const textInputChange =(val => {
    if(val.length!= 0){
        setdata({
            ... data,
            email:val,
            check_textInputChange:true
        })
    }
    else
    {
        setdata({
            ...data,
            password:val,
            check_textInputChange:false
        })
    }
  })
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../Assets/Logo-White.png')}
            style={{width: 130, height: 130, top: 10, left: 130}}
          />
        }
        <Text style={styles.header_Text}> Welcome!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={30} />
          <TextInput
            placeholder="Your Email.............................................."
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={(val)=>{textInputChange(val); setEmail(val)}}
          />
          {data.check_textInputChange ? 
          <Animatable.View animation={"bounceIn"}>
          <Feather name="check-circle" color="#071629" size={30} /></Animatable.View>
          :null} 
        </View>
        <Text style={[styles.footer_text, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={30} />
          <View>
          <TextInput
            placeholder="Your Password....................................."
            style={styles.TextInput}
           secureTextEntry={data.secureTextEntry?true:false}
            autoCapitalize="None"
            onChangeText={(val)=>{PasswordChange(val); setPassword(val)}}
          ></TextInput></View>

        </View>
        <View>
          <TouchableOpacity
         onPress={updateSecureTextEntry}
          > 
          <FontAwesome 
          name="eye-slash" color="#071629" size={30} style={styles.eyeslach}/></TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity onPress={()=> login(email,password)} style={styles.buttonStyle}>
            <Text style={styles.textSign}>Sign In</Text>
            </TouchableOpacity>
            </View>
            
            <View >
            <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')} style={styles.button}>
            <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            </View>
            {/* <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
    disabled={this.state.isSigninInProgress} /> */}
                 </View>
   
    </View>
    //     <LinearGradient

    //     colors={['#071629', '#ffffff']}
    //     style={styles.container}
    //     start={{ x: 1, y:0 }}
    //     end={{ x: 6, y:2 }}
    //   >
    //     <View style={styles.header}>
    //         <Text >Welcome!</Text>
    //         {/* <Animatable.Image
    //         animation="bounceIn"
    //         duration={1500}
    //          source = {require('../Assets/Logo-White.png')} style = {{ width: 150, height: 150 }}/>
    //         */}
    //     </View>
    //     <Animatable.View
    //     animation={"fadeInUpBig"}
    //     style={styles.footer}>

    //         <View style={styles.buttonStyle}>
    //         <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}>
    //         <Text style={styles.textSign}>Sign Up</Text>
    //         </TouchableOpacity>
    //         </View>
    //     </Animatable.View>

    //   </LinearGradient>
  );
};
export default LoginScreen;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
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
  footer_text: {
    fontSize: 25,
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

  logo: {
    width: height_logo,
    height: height_logo,
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
    backgroundColor: '#071629',
    width: 300,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    borderRadius: 8,
    top: 0,
    left: 20,
    padding: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:2,
    borderColor:'#071629',
    width: 300,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    borderRadius: 8,
    top: 0,
    left: 20,
    padding: 5,
  },
});