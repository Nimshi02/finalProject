import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const ViewItemsScreen=({navigation}) =>{
    return (
        <View style={styles.container}>
            <Text>ViewItems</Text>
        </View>
    )
}
export default ViewItemsScreen;

const styles= StyleSheet.create(
    {
        container:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center'
        },
    });