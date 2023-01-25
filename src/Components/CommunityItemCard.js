import React from "react";
import {Container,Card,Item,ItemImage,ItemInfoText,PostDate,ItemName, ItemHeading, HeadingWrapper, HeadingWrapper2, Qty} from '../Styles/DonationStyle';


const CommunityItem=({item})=>{
    return(
        <Card>
            {item.Type != 'Ingredient' ?  <HeadingWrapper><ItemHeading style={{textAlign:"center"}}>{item.Type}</ItemHeading></HeadingWrapper> : <HeadingWrapper2><ItemHeading style={{textAlign:"center"}}>{item.Type}</ItemHeading></HeadingWrapper2>}
           
        <Item>
            <ItemImage source={item.ItemImage}/>                 
        </Item> 
        <ItemName>{item.ItemName}</ItemName                >
            <PostDate>{item.PostDate}</PostDate> 
            <Qty>{item.Qty}</Qty>  
    </Card> 
    );
}
export default CommunityItem;