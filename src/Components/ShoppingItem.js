import React, { isValidElement,useState } from "react";
import {Container,Card,ItemName,Devider,Box,CheckBoxStyle,TrashStyle} from '../Styles/ShoppingListStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ShoppingItem=({item})=>{
    const [isSelected, setSelection] = useState(false);
    return(
        <View>
        <Box>
            
    <CheckBoxStyle><CheckBox
          value={isSelected}
          onValueChange={setSelection}
        /></CheckBoxStyle>
        <ItemName>{item.ItemName}</ItemName>
                {/* <Devider/>  */}
        </Box>
        <TrashStyle><FontAwesome 
        name="trash" color="#000" size={30} /></TrashStyle>
        </View>

    );
}
export default ShoppingItem;