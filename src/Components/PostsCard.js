import React from "react";
import {Container,Card,User,UserImage,UserName,UserInfoText,PostDate,PostImage,PostText} from '../Styles/ForumStyle';
import { View, StyleSheet } from "react-native";
import moment from "moment";
const PostCard=({item})=>{
    return(
        <View style={styles.card}>
        <User>
            <UserImage source={{uri:item.userImage}}/> 
            <UserInfoText>
            <UserName>{item.userName}</UserName>
            <PostDate>{moment(item.postTime.toDate()).fromNow()}</PostDate>
              </UserInfoText>                    
        </User> 
        <PostText>{item.postText}</PostText>
        {item.PostImage != 'null' ? <PostImage source={{uri:item.postImage}} /> : null}
    </View> 
    );
}
export default PostCard;

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#f8f8f8',
      width: 350,
      height: 430,
      top: 10,
      marginBottom: 10,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      paddingBottom: -30,
      paddingTop: 0,
      alignItems: 'flex-start',
      borderRadius: 10,
      shadowColor: '#071629',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 1,
      elevation: 6,
    },
});