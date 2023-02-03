import * as Animatable from 'react-native-animatable';
import React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PostCard from '../Components/PostsCard';
import {Container} from '../Styles/ForumStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Posts=[
    {
        id:'1',
        UserName:'Janny Doe',
        UserImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        PostImage:require('../Assets/testImage.jpg'),
    },
    {
        id:'2',
        UserName:'John Doe',
        UserImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        PostImage:require('../Assets/testImage.jpg'),
    },
    {
        id:'3',
        UserName:'John Doe',
        UserImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        PostText:'Hi there i am the test text hear I am going to add more details to to it. Now it is working finly',
        PostImage:require('../Assets/testImage.jpg'),
    },
    {
        id:'4',
        UserName:'John Doe',
        UserImage:require('../Assets/user.png'),
        PostDate:'4 mins ago',
        PostText:'Hear I am adding a content to you',
        PostImage:'none',
    },
] 
const Forum=({navigation}) =>{
 

    return (
       
        <Container>
           
        <FlatList
        data={Posts}
        renderItem={({item}) => <PostCard item={item}/>} 
        keyExtractor={item=>item.id} 
        showsVerticalScrollIndicator={false}/>
        <TouchableOpacity  style={styles.buttonStyle} onPress={() => navigation.navigate('AddPostScreen')}>
            <View style={{top:10}} ><FontAwesome 
              name="plus" color="#fff" size={30}/></View>
           </TouchableOpacity> 
        </Container>
    
            
           
    )
}
export default Forum;

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#d0c6c6',
        width: 60,
        height: 60,
        borderRadius: 30,
        top: -20,
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