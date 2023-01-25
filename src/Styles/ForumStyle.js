import styled from 'styled-components';

export const Container= styled.View`
flex:1;
justify-content:center;
background-color:#fff;
align-items:center;
`;
export const Card=styled.View`
background-color:#f8f8f8;
width:100%;
margin-bottom:30px;
padding-bottom:40px;
border-radius:10px
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
margin-left:23px
`;

export const PostDate=styled.Text`
font-size:12px;
`;

export const UserName=styled.Text`
font-size:14px;
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