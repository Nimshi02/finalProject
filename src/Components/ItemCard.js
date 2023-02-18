import React from "react";
import {Container,Card,Item,ItemImage,ItemInfoText,PostDate,ItemName, ItemHeading, HeadingWrapper, HeadingWrapper2, Qty} from '../Styles/DonationStyle';


const ItemCard=({item})=>{
    return(
        <Card>
            {item.Type != 'Ingredient' ?  <HeadingWrapper><ItemHeading style={{textAlign:"center"}}>{item.Type}</ItemHeading></HeadingWrapper> : <HeadingWrapper2><ItemHeading style={{textAlign:"center"}}>{item.Type}</ItemHeading></HeadingWrapper2>}
           
        <Item>
            <ItemImage source={{uri:item.ItemImage}}/>                 
        </Item> 
        <ItemName>{item.ItemName}</ItemName                >
            <PostDate>{item.PostDate.toString()}</PostDate> 
            <Qty>{item.Qty}</Qty>  
    </Card> 
    );
}
export default ItemCard;