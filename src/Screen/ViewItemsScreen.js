import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

import {Container,Card,Items,ItemImage,ItemName,ItemInfoText,ExpireTime,RemainQty,QtyWrap} from '../Styles/ViewItemStyle';
const ViewItemsScreen=({navigation}) =>{
    return (
        <Container>
            <Card>
                <Items>
                    <ItemImage source={require('../Assets/onboarding-img1.png')}/> 
                    <ItemInfoText>
                    <ItemName>TestItem</ItemName>
                    <ExpireTime>11/12/2022</ExpireTime>
                    </ItemInfoText>
                    <QtyWrap>
                    <RemainQty>11/12/2022</RemainQty>
                    </QtyWrap>
                  
                </Items> 
            </Card>
        </Container>
    )
}
export default ViewItemsScreen;

