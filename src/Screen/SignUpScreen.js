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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {PrintDisabledTwoTone} from '@material-ui/icons';
import { authcontext } from '../Navigation/AuthenticationProvider';

const SignUpScreen = ({navigation}) => {

const {register} = useContext(authcontext);
const [email,setEmail]=useState();
const[password,setPassword]=useState();
  const [data, setdata] = react.useState({
    Email: '',
    UserName: '',
    Address: '',
    ConfirmPassword: '',
    Password: '',
    check_textInputChange: false,
    check_textInputChange2: false,
    check_textInputChange3: false,
    secureTextEntry: true,
    secureTextEntry2: true,
  });



  const PasswordChange = val => {
    setdata({
      ...data,
      Password: val,
    });
  };
  const ConfirmPasswordChange = val => {
    setdata({
      ...data,
      ConfirmPassword: val,
    });
  };
  const updateSecureTextEntry = () => {
    setdata({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateSecureTextEntry2 = () => {
    setdata({
      ...data,
      secureTextEntry2: !data.secureTextEntry2,
    });
  };
  const textInputChange = val => {
    if (val.length != 0) {
      setdata({
        ...data,
        Email: val,
        check_textInputChange: true,
      });
    } else {
      setdata({
        ...data,
        Email: val,
        check_textInputChange: false,
      });
    }
  };
  const textInputChange2 = val => {
    if (val.length != 0) {
      setdata({
        ...data,
        UserName: val,
        check_textInputChange2: true,
      });
    } else {
      setdata({
        ...data,
        UserName: val,
        check_textInputChange2: false,
      });
    }
  };
  const textInputChange3 = val => {
    if (val.length != 0) {
      setdata({
        ...data,
        Address: val,
        check_textInputChange3: true,
      });
    } else {
      setdata({
        ...data,
        Address: val,
        check_textInputChange3: false,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../Assets/Logo-White.png')}
            style={{width: 90, height: 90, top: 10, left: 150}}
          />
        }
        <Text style={styles.header_Text}> Sign Up!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#05375a" size={30} />
          <TextInput
            placeholder="Your Email..........................................................."
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => {textInputChange(val); setEmail(val)}}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation={'bounceIn'}>
              <Feather name="check-circle" color="#071629" size={30} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={[styles.footer_text, {marginTop: 10}]}>UserName</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={30} />
          <TextInput
            placeholder="Your UserName...................................................."
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange2(val)}
          />
          {data.check_textInputChange2 ? (
            <Animatable.View animation={'bounceIn'}>
              <Feather name="check-circle" color="#071629" size={30} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={[styles.footer_text, {marginTop: 10}]}>Address</Text>
        <View style={styles.action}>
          <Feather name="map-pin" color="#05375a" size={30} />
          <TextInput
            placeholder="Your Address......................................................."
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange3(val)}
          />
          {data.check_textInputChange3 ? (
            <Animatable.View animation={'bounceIn'}>
              <Feather name="check-circle" color="#071629" size={30} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={[styles.footer_text, {marginTop: 10}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={30} />
          <View>
            <TextInput
              placeholder="password............................................................"
              style={styles.TextInput}
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="None"
              onChangeText={val => {PasswordChange(val);setPassword(val)}}></TextInput>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <FontAwesome
              name="eye-slash"
              color="#071629"
              size={30}
              style={styles.eyeslach}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.footer_text, {marginTop: -20}]}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={30} />
          <View>
            <TextInput
              placeholder="Confirm password.............................................."
              style={styles.TextInput}
              secureTextEntry={data.secureTextEntry2 ? true : false}
              autoCapitalize="None"
              onChangeText={val => ConfirmPasswordChange(val)}></TextInput>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={updateSecureTextEntry2}>
            <FontAwesome
              name="eye-slash"
              color="#071629"
              size={30}
              style={styles.eyeslach}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonStyle}
          onPress={()=> register(email,password)}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SignUpScreen;
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
    fontSize: 35,
    color: '#fff',
    left: 10,
    top: 2,
  },
  footer: {
    flex: 7.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  footer_text: {
    fontSize: 15,
  },
  TextInput: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 40,
    fontSize: 30,
    color: '#05375a',
  },
  eyeslach: {
    alignItems: 'flex-start',
    top: -50,
    left: 315,
  },
  action: {
    flexDirection: 'row',
    marginTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 0,
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
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  text: {
    color: 'grey',
    marginTop: 2,
    margineEnd: 5,
    fontSize: 14,
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
    fontSize: 13,
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
    top: 20,
    left: 15,
    padding: 5,
  },
});
