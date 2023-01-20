import react from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Home</Text>
      <Image source={require('../Assets/Logo-Blue.png')}
            style={{width: 100, height: 100 }}/>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('View Available Items')}><Text style={styles.textStyle} >View Available Items</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>View Recpies</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>Donate Items</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>View Shopping List</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>View Required Donations</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>Donate Items</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>View Restaurents Discounts</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>Forum</Text></TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    //backgroundColor: '#071629',
    backgroundColor: '#D9D8D8',
    width: 300,
    height: 35,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    borderRadius: 8,
    left:10,  
    padding: 5,
  },
  headerStyle:{
    fontSize: 60,
    color: '#071629',
    left: 10,
    top: -10,
  },
  textStyle:{
    color:"#071629",
  }
});
