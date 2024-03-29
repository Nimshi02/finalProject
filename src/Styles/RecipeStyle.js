import styled from 'styled-components';

export const Container= styled.View`

flex:1;
padding-top:30px;
justify-content:center;
background-color:#fff;
align-items:center;
`;


export const User = styled.View`
margin-top:14px;
flex-direction:row;
justify-content:flex-start;
padding:10px;
`;

export const UserImage=styled.Image`
width:50px;
height:50px;
left:10px;
boarrder-redius:25px;
`;

export const UserInfoText=styled.View`
flex-direction:column;
justify-content:center;
`;

export const PostDate=styled.Text`
font-size:12px;
`;

export const RecipeName=styled.Text`
font-size:20px;
font-weight:bold;
`;


export const PostText=styled.Text`
font-size:14px;
font-weight:bold;
padding-left:10px;
padding-right:10px;
font-family:'Lato-Regular';
`;

export const PostImage=styled.Image`
width:100%;
height:250px;
margin-top:12px`;