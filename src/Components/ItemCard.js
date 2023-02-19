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
  ItemHeading,
  HeadingWrapper,
  HeadingWrapper2,
  Qty,
} from '../Styles/DonationStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { useState } from 'react';

const ItemCard = ({item,onDelete,onClick}) => {
  const [visibility,setVisibility]=useState(false);
  const {user, logout} = useContext(authcontext);
  return (
    
    <Card><TouchableOpacity onPress={()=> setVisibility(true)}>
      {item.Type != 'Ingredient' ? (
        <HeadingWrapper>
          <ItemHeading style={{textAlign: 'center'}}>{item.Type}</ItemHeading>
        </HeadingWrapper>
      ) : (
        <HeadingWrapper2>
          <ItemHeading style={{textAlign: 'center'}}>{item.Type}</ItemHeading>
        </HeadingWrapper2>
      )}

      <Item>
        <ItemImage source={{uri: item.ItemImage}} />
      </Item>
      <ItemName>{item.ItemName}</ItemName>
      <PostDate>{item.PostDate.toString()}</PostDate>
      <Qty>{item.Qty}</Qty>
      {user.uid == item.userId ? (
        <TouchableOpacity ><View style={{top: 0, left: 260}}>
          <FontAwesome name="trash-o" color="#000" size={30} onPress={() => onDelete(item.id)} />
        </View></TouchableOpacity>
      ) : null}
</TouchableOpacity>
      <Modal transparent={false} visible={visibility}><View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View style={styles.popup}>
        <Text style={{fontSize:18}}>Doner: {item.owner}</Text>
        <Text  style={{fontSize:18}}>Telephone:{item.owners_number}</Text>
        <Text  style={{fontSize:18}}>Location:{item.Location}</Text>
        <Text></Text>
        <Text  style={{fontSize:22}}>Will you recieve the donation?</Text>
        <TouchableOpacity style={styles.submitStyle} onPress={() => onClick(item.id)}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>
                Yes
              </Text>
            </TouchableOpacity>
            <View style={{left:120,top:-40}}><TouchableOpacity style={styles.submitStyle} onPress={()=> setVisibility(false)}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>
                No
              </Text>
            </TouchableOpacity></View>
        </View>
        </View ></Modal>
    </Card>
  );
};
export default ItemCard;

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
submitStyle: {
  backgroundColor: '#05375a',
  top: 10,
  width:100,
  borderRadius: 15,
  paddingVertical: 10,
  paddingHorizontal: 20,
 
},
});
