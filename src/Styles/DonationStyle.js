import styled from 'styled-components';

export const Container= styled.View`
flex:1;
padding-top:30px;
justify-content:center;
background-color:#fff;
align-items:center;
`;
export const Card=styled.View`
background-color:#f8f8f8;
width:100%;
margin-bottom:30px;
padding-bottom:20px;
border-radius:10px;
`;

export const Item = styled.View`
flex-direction:row;
justify-content:flex-start;
`;

export const ItemImage=styled.Image`
width:300px;
height:240px;
`;

export const ItemInfoText=styled.View`
flex-direction:column;
justify-content:center;
margin-left:23px
`;

export const HeadingWrapper=styled.View`
background-color:#798486;
width:100%;
justify-content:center;
height:50px;
`;

export const HeadingWrapper2=styled.View`
background-color:#B3B3BD;
width:100%;
justify-content:center;
height:50px;
`;

export const ItemHeading=styled.Text`
font-size:20px;
font-weight:bold;
padding-left:10px;
padding-right:10px;
font-family:'Lato-Regular';
`;

export const PostDate=styled.Text`
padding-left:10px;
font-size:14px;
`;
export const Qty=styled.Text`
padding-left:10px;
font-size:14px;
`;

export const ItemName=styled.Text`
padding-left:10px;
font-size:18px;
font-weight:bold;
`;


export const PostText=styled.Text`
font-size:18px;
font-weight:bold;
padding-left:10px;
padding-right:10px;
font-family:'Lato-Regular';
`;
export const AddImage = styled.Image`
    width: 120px;
    height: 120px;
    top:-5px;
    margin-bottom: 15px;
    border-radius:60px;
`;

