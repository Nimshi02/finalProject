import react from 'react';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MeterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import LoginScreen from './LoginScreen';
const SelectionScreen = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#071629', '#ffffff']}
      style={styles.container}
      start={{x: 1, y: 0}}
      end={{x: 6, y: 2}}>
      <View style={styles.header}>
        <Text>header</Text>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../Assets/Logo-White.png')}
          style={{width: 250, height: 250}}
        />
      </View>
      <Animatable.View animation={'fadeInUpBig'} style={styles.footer}>
        <Text style={styles.title}>
          Let's conserve food by every way possible !
        </Text>
        <Text style={styles.text}>Login with account. Link up with peers.</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.buttonStyle}>
            <Text style={styles.textSign}>Sign In </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={styles.buttonStyle}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};
export default SelectionScreen;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  text: {
    color: 'grey',
    marginTop: 2,
    margineEnd: 5,
    fontSize: 16,
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 110,
    flexDirection: 'row',
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
});
