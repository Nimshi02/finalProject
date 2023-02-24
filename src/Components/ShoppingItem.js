import React, { isValidElement,useState } from "react";
import {Container,Card,ItemName,Devider,Box,CheckBoxStyle,TrashStyle} from '../Styles/ShoppingListStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ShoppingItem=({item,onDelete,onClick})=>{
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
        name="trash" color="#000" size={30} onPress={()=> onDelete(item.id)}/></TrashStyle>
        {isSelected?onClick(item.id):null}
        </View>

    );
}
export default ShoppingItem;