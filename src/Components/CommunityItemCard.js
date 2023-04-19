import React from "react";
import {Container,Card,Item,ItemImage,ItemInfoText,PostDate,ItemName, ItemHeading, HeadingWrapper, HeadingWrapper2, Qty} from '../Styles/DonationStyle';
import moment from "moment";

const CommunityItem=({item})=>{
    return(
        <Card>
            {item.Type != 'Ingredient' ?  <HeadingWrapper><ItemHeading style={{textAlign:"center"}}>{item.Type}</ItemHeading></HeadingWrapper> : <HeadingWrapper2><ItemHeading style={{textAlign:"center"}}>{item.Type}</ItemHeading></HeadingWrapper2>}
           
        <Item>
            <ItemImage source={item.ItemImage}/>                 
        </Item> 
        <ItemName>{item.ItemName}</ItemName>
            <PostDate>{moment(item.PostDate.toDate()).fromNow()}</PostDate> 
            <Qty>{item.Qty}</Qty>  
    </Card> 
    );
}
export default CommunityItem;