import * as Animatable from 'react-native-animatable';
import React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CommunityItem from '../Components/CommunityItemCard';
import {Container} from '../Styles/ForumStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CommunityItems=[
    {
        id:'1',
        ItemName:'Burger',
        Type:'Meal',
        UserImage:require('../Assets/user.png'),
        ItemImage:require('../Assets/testFoodItem.jpg'),
        PostDate:'4 mins ago',
        Expiredate:'20/11/2023',
        Qty:'100 grams',
        owner:'Mr.Ajith',
        owners_number:'0777734734'
    },
    {
        id:'2',
        ItemName:'Cream Cheese',
        Type:'Ingredient',
        UserImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        Expiredate:'20/11/2023',
        Qty:'100 grams',
        owner:'Mr.Ajith',
        owners_number:'0777734734'
    },
    {
        id:'3',
        ItemName:'Pasta',
        Type:'Meal',
        ItemImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        Expiredate:'20/11/2023',
        Qty:'100 grams',
        owner:'Mr.Ajith',
        owners_number:'0777734734'
    },
    {
        id:'4',
        ItemName:'Pasta',
        UserImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        Expiredate:'20/11/2023',
        Qty:'100 grams',
        owner:'Mr.Ajith',
        owners_number:'0777734734'
    },
] 
const CommunityItemScreen=({navigation}) =>{
 

    return (
       
        <Container>
           
        <FlatList
        data={CommunityItems}
        renderItem={({item}) => <CommunityItem item={item}/>} 
        keyExtractor={item=>item.id} 
        showsVerticalScrollIndicator={false}/>
        <TouchableOpacity  style={styles.buttonStyle} onPress={() => navigation.navigate('Add Item To Community')}>
            <View style={{top:10}} ><FontAwesome 
              name="plus" color="#fff" size={30}/></View>
           </TouchableOpacity> 
        </Container>
    
            
           
    )
}
export default CommunityItemScreen;

const styles = StyleSheet.create({
    buttonStyle: {
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