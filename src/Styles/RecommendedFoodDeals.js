import styled from 'styled-components';

export const Container= styled.View`
flex:1;
padding-top:30px;
justify-content:center;
background-color:#fff;
align-items:center;
`;
export const Card=styled.View`
background-color:#fff;
width:160px;
margin-bottom:30px;
padding-bottom:20px;
border-radius:10px;
shadowColor: '#9f9393',
shadowOffset: {
  width: 0,
  height: 0,
},
shadowOpacity: 0.5,
shadowRadius: 10,
elevation: 8,
`;

export const Item = styled.View`
flex-direction:row;
justify-content:flex-start;
`;

export const ItemImage=styled.Image`

width:100px;
height:100px;
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
export const Location=styled.Text`
padding-left:10px;
font-size:16px;
`;

export const ItemName=styled.Text`
padding-left:10px;
font-size:18px;
font-weight:bold;
`;

export const ItemDiscount=styled.Text`
padding-left:10px;
font-size:18px;
font-weight:bold;
color:#8e0200;
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

