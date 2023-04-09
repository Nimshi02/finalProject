import React, {useContext} from 'react';
import {authcontext} from '../Navigation/AuthenticationProvider';
import {
  Container,
  Card,
  Item,
  ItemImage,
  ItemInfoText,
  PostDate,
  ItemName,
  ItemDiscount,
  ItemHeading,
  HeadingWrapper,
  HeadingWrapper2,
  Location,
} from '../Styles/RecommendedFoodDeals';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import { useState } from 'react';
import { style, width } from '@mui/system';

const RFoodDealCard = ({item,onDelete,onClick}) => {
  const [visibility,setVisibility]=useState(false);
  const {user, logout} = useContext(authcontext);
  return (
    
    <View style={styles.card}>
      {/* {item.Type != 'Ingredient' ? (
        <HeadingWrapper>
          <ItemHeading style={{textAlign: 'center'}}>{item.Type}</ItemHeading>
        </HeadingWrapper>
      ) : (
        <HeadingWrapper2>
          <ItemHeading style={{textAlign: 'center'}}>{item.Type}</ItemHeading>
        </HeadingWrapper2>
        uri: item.ItemImage
      )} */}

      <Item>
        <ItemImage source={{uri:item.userImage}} style={{top:30,left:30}}/>
      </Item>
      <View style={{top:30}}>
      <ItemName>{item.ItemName}</ItemName>
      <PostDate>{item.ValidDate} remaining</PostDate>
      <Location>{item.resName}</Location>
      <Location>{item.resAddress}</Location></View>
      <View style={styles.shape}><Text style={{color:'#fff',fontSize:20,fontWeight:'bold',left:12,top:5}}>{item.discountRate}%</Text></View>
    
    </View>
  );
};
export default RFoodDealCard;

const styles = StyleSheet.create({
popup:{
  backgroundColor: '#ffffffff',
              marginBottom: 250,
              marginTop:250,
              marginLeft:50,
              marginRight:50,
              padding: 40,
              borderRadius: 20,
              flex: 1,
},
shape:{
  borderBottom: 50,
  backgroundColor:'#000',
  width:60,
  height:40,
	borderBottomLeftRadius:20,
  borderTopRightRadius:10,
  top:-185,
	left:100,
	// height: 0,
	// width: 125,
  // color:'#000'
},
submitStyle: {
  backgroundColor: '#05375a',
  top: 10,
  width:100,
  borderRadius: 15,
  paddingVertical: 10,
  paddingHorizontal: 20,
 
},
card:{
  backgroundColor:'#fff',
width:160,
height:235,
top:-10,
marginBottom:10,
marginRight:10,
marginLeft:10,
marginTop:10,
paddingBottom:10,
borderRadius:10,
shadowColor: '#071629',
shadowOffset: {
  width: 0,
  height: 0,
},
shadowOpacity: 0.,
shadowRadius: 1,
elevation: 6,
}
});
