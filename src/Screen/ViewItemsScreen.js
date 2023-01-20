import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

import {Container,Card,Items,ItemImage} from '../Styles/ViewItemStyle';
const ViewItemsScreen=({navigation}) =>{
    return (
        <Container>
            <Card>
                <Items>
                    {/* <ItemImage/> */}
                </Items> 
            </Card>
        </Container>
    )
}
export default ViewItemsScreen;

