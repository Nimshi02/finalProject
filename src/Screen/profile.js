import react from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {withSafeAreaInsets} from 'react-native-safe-area-context';
const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/testImage.jpg')}
        style={{width: 150, height: 150,top:-60,borderRadius:90}}
      />
      <Text style={{textAlign:'center',fontSize:25}}>Jane Doe</Text>
      <Text style={{padding:18,fontSize:20}}>Jane Doe is a fellow how is trying to save the food as much as possible. She is a hero lives in UK. </Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("UpdateUserProfile")}><Text style={{color:'#071629'}}>Update profile</Text></TouchableOpacity>
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
