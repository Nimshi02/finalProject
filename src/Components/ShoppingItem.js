import React, { isValidElement } from "react";
import {Container,Card,ItemName} from '../Styles/ShoppingListStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ShoppingItem=({item})=>{
    const [isSelected, setSelection] = useState(false);
    return(
        <View>
         <CheckBox
          value={isSelected}
          onValueChange={setSelection}
        />
        <ItemName>{item.ItemName}</ItemName>
        <FontAwesome 
              name="trash" color="#fff" size={30}/>
        <Devider/>
        </View>
    );
}
export default PostCard;