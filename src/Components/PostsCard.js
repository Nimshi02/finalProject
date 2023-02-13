import React from "react";
import {Container,Card,User,UserImage,UserName,UserInfoText,PostDate,PostImage,PostText} from '../Styles/ForumStyle';


const PostCard=({item})=>{
    return(
        <Card>
        <User>
            <UserImage source={{uri:item.userImage}}/> 
            <UserInfoText>
            <UserName>{item.userName}</UserName>
            <PostDate>{item.postTime.toString()}</PostDate>
              </UserInfoText>                    
        </User> 
        <PostText>{item.postText}</PostText>
        {item.PostImage != 'null' ? <PostImage source={{uri:item.postImage}} /> : null}
    </Card> 
    );
}
export default PostCard;