import React from "react";
import { View, Text, Button, StyleSheet,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Container,Card,Items,ItemImage,ItemName,ItemInfoText,ExpireTime,RemainQty,QtyWrap} from '../Styles/ViewItemStyle';
const AvailableItem=({item,onDelete}) =>{
    return (
            <Card>
                <Items>
                    <ItemImage source={{uri:item.ItemImage}}/> 
                    <ItemInfoText>
                    <ItemName>{item.ItemName}</ItemName>
                    <ExpireTime>{item.Expiredate}</ExpireTime>
                    </ItemInfoText>
                    <QtyWrap>
                    <RemainQty>{item.Qty}   <TouchableOpacity ><View>
          <FontAwesome name="trash-o" color="#000" size={23} onPress={() => onDelete(item.id)} />
        </View></TouchableOpacity>       </RemainQty>

                    </QtyWrap>
                   
                </Items> 
            </Card>
    )
}
export default AvailableItem;

