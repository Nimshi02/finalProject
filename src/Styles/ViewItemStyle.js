import styled from 'styled-components';

export const Container= styled.View`
flex:1;
background-color:#fff;
justify-content:center;
align-content:center;
`;
export const Card=styled.View`
background-color:#f8f8f8;
width:95%;
margin-bottom:30px;
margin-left:10px;
margin-right:0px;
padding-top:10px;
padding-bottom:10px;
border-radius:20px;
shadow-color: #071629;
shadow-offset: {
  width: 0;
  height: 0;
},
shadow-opacity: 0;
shadow-radius: 1px;
elevation: 6;
`;

export const Items = styled.View`
flex-direction:row;
justify-content:flex-start;
`;

export const ItemImage=styled.Image`
width:50px;
height:50px;
left:20px;
border-radius:30px
`;

export const ItemInfoText=styled.View`
flex-direction:column;
justify-content:center;
margin-left:50px
`;

export const ExpireTime=styled.Text`
font-size:14px;
font-weight:bold;
`;

export const ItemName=styled.Text`
font-size:14px;
font-weight:bold;
`;
export const QtyWrap=styled.View`
flex-direction:column;
justify-content:center;
margin-left:70px
`;
export const RemainQty=styled.Text`
font-size:14px;
font-weight:bold;
`;