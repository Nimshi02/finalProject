import * as Animatable from 'react-native-animatable';
import React,{useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import ItemCard from '../Components/ItemCard';
import {Container} from '../Styles/DonationStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

const Donations = [
  {
    id: '1',
    ItemName: 'Burger',
    Type: 'Meal',
    UserImage: require('../Assets/user.png'),
    ItemImage: require('../Assets/testFoodItem.jpg'),
    PostDate: '4 mins ago',
    Expiredate: '20/11/2023',
    Qty: '100 grams',
    owner: 'Mr.Ajith',
    owners_number: '0777734734',
  },
  {
    id: '2',
    ItemName: 'Cream Cheese',
    Type: 'Ingredient',
    UserImage: require('../Assets/user.png'),
    PostDate: '4 mins ago',
    Expiredate: '20/11/2023',
    Qty: '100 grams',
    owner: 'Mr.Ajith',
    owners_number: '0777734734',
  },
  {
    id: '3',
    ItemName: 'Pasta',
    Type: 'Meal',
    ItemImage: require('../Assets/user.png'),
    PostDate: '4 mins ago',
    Expiredate: '20/11/2023',
    Qty: '100 grams',
    owner: 'Mr.Ajith',
    owners_number: '0777734734',
  },
  {
    id: '4',
    ItemName: 'Pasta',
    UserImage: require('../Assets/user.png'),
    PostDate: '4 mins ago',
    Expiredate: '20/11/2023',
    Qty: '100 grams',
    owner: 'Mr.Ajith',
    owners_number: '0777734734',
  },
];
const DonateScreen = ({navigation}) => {
  const [visibility,setVisible]= useState(false);
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
    <Container>
      <FlatList
        data={Donations}
        renderItem={({item}) => <ItemCard item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    
      <TouchableOpacity  style={styles.addBtnStyle} onPress={() =>setVisible(true)}>
            <View style={{top:10}} ><FontAwesome
              name="plus" color="#fff" size={30}/></View>
           </TouchableOpacity> 

      {/* PopUp is starting from here */}
      <Modal transparent={false} visible={visibility}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffffff',
              margin: 50,
              padding: 40,
              borderRadius: 20,
              flex: 1,
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Add Donations
            </Text>
            <View style={styles.pictureStyle}>
             <TouchableWithoutFeedback ><View style={{top:27}}><FontAwesome name="cutlery" color="#05375a" size={60} /></View>
</TouchableWithoutFeedback> 
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={takePhotoFromCamera}><View style={{top:3}}><FontAwesome 
              name="plus" color="#fff" size={20}/></View></TouchableOpacity>
              <View style={{top:70}}><TextInput placeholder='Product Name'></TextInput>
              <TextInput placeholder='Quantity'></TextInput>
              <TextInput placeholder='Expire Dates'></TextInput>
              <TextInput placeholder='Users Contact Details'></TextInput>
              <TextInput placeholder='Pickup Location'></TextInput></View>
              <TouchableOpacity style={styles.submitStyle}><Text style={{color:"#fff", alignSelf:"center"}}>Add Donation</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};
export default DonateScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#05375a',
    width: 35,
    height: 35,
    borderRadius: 30,
    top: 35,
    left: 140,
    padding: 5,
    shadowColor: "#9f9393",
shadowOffset: {
  width: 0,
  height: 0,
},
shadowOpacity: 0.5,
shadowRadius: 10,
elevation: 8,
  },
  pictureStyle: {
    borderRadius: 100,

    padding: 5,
    shadowColor: '#9f9393',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
    backgroundColor: '#d4d4d3',
    width: 120,
    height: 120,
    top:80,
    left:50
  },
  submitStyle:{
    backgroundColor: "#05375a",
    top:100,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25
    },
    buttonText:{
      fontSize: 20,
    color: "#fff",
    },
    addBtnStyle: {
      alignItems: 'center',
      backgroundColor: '#d0c6c6',
      width: 60,
      height: 60,
      borderRadius: 30,
      top: -60,
      left: 130,
      padding: 5,
      shadowColor: "#9f9393",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 8,
    },
});
