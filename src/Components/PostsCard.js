import React from "react";
import {Container,Card,User,UserImage,UserName,UserInfoText,PostDate,PostImage,PostText} from '../Styles/ForumStyle';


const PostCard=({item})=>{
    return(
        <Card>
        <User>
            <UserImage source={item.UserImage}/> 
            <UserInfoText>
            <UserName>{item.UserName}</UserName>
            <PostDate>{item.PostDate}</PostDate>
              </UserInfoText>                    
        </User> 
        <PostText>{item.PostText}</PostText>
        {item.PostImage != 'none' ? <PostImage source={item.PostImage} /> : null}
    </Card> 
    );
}
export default PostCard;