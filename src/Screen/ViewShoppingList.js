import * as Animatable from 'react-native-animatable';
import React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CommunityItem from '../Components/CommunityItemCard';
import {Container,Card} from '../Styles/ShoppingListStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CommunityItems=[
    {
        id:'1',
        ItemName:'Burger',
    },
    {
        id:'2',
        ItemName:'Cream Cheese',
    },
    {
        id:'3',
        ItemName:'Pasta',

    },
    {
        id:'4',
        ItemName:'Pasta',
    },
] 
const CommunityItemScreen=({navigation}) =>{
 

    return (
       
        <Container>
           <Card>
        <FlatList
        data={CommunityItems}
        renderItem={({item}) => <CommunityItem item={item}/>} 
        keyExtractor={item=>item.id} 
        showsVerticalScrollIndicator={false}/>
        <TouchableOpacity  style={styles.buttonStyle} onPress={() => navigation.navigate('Add Item To Community')}>
            <View style={{top:10}} ><FontAwesome 
              name="plus" color="#fff" size={30}/></View>
           </TouchableOpacity> 
           </Card>
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