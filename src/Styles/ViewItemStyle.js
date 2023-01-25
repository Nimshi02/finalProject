import styled from 'styled-components';

export const Container= styled.View`
flex:1;
background-color:#fff;
justify-content:center;
align-content:center;
`;
export const Card=styled.View`
background-color:#f8f8f8;
width:100%;
margin-bottom:20px;
border-radius:10px
`;

export const Items = styled.View`
flex-direction:row;
justify-content:flex-start;
`;

export const ItemImage=styled.Image`
width:50px;
height:50px;
left:30px;
boarrder-redius:25px;
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
margin-left:90px
`;
export const RemainQty=styled.Text`
font-size:14px;
font-weight:bold;
`;