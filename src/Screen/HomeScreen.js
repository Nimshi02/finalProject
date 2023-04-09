import react from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {authcontext} from '../Navigation/AuthenticationProvider';
import firestore from '@react-native-firebase/firestore';
import {useState,useContext, useEffect} from 'react';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(authcontext);
  const [items,setItems]=useState(null);
  const getIngredients = async()=>{
    console.log("now running this")
    try {
      const list = [];

      await firestore()
        .collection('Ingredients')
        .orderBy('PostDate', 'desc')
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {
              userId,
              ItemName,
              Expiredate,
              Qty,
            } = doc.data();
            list.push({
              docId:doc.id,
              userId,
              ItemName,
              Expiredate,
              Qty,
            });
          });
        });

        setItems(list);
        if(list!=null){
          updateIngredients_and_addToShoppingList();
        }
       
    } 
    catch (e) {
      console.log(e);
    }
  }
  const updateIngredients_and_addToShoppingList= async ()=>{
    var i=0;
    for(i=0;i<items.length;i++){
      if(items[i].ItemName!="eggs"){
        console.log("not an egg")
        if(items[i].Qty<=50){
          console.log("running this");
          firestore()
          .collection('ShoppingItems')
          .add({
            userId:user.uid,
            ItemName:items[i].ItemName,
            ItemPostedDate:firestore.Timestamp.fromDate(new Date()),
    
          })
          .then(() => {
            console.log('Shopping Item added automatically');
            alert('Item Added!');
          })
          .catch(error => {
            console.log(
              'Something went wrong with added item to firestore.',
              error,
            );})
        }
        if(items[i].Qty<0){
          console.log("next delete this");
          console.log(items[i].docId);
          firestore()
          .collection('Ingredients')
          .doc(items[i].docId)
          .delete()
          .then(() => {
           alert("deletedSuccessfully")
          })
          .catch(e => console.log('Error deleting posst.', e));
        }
      }
    }
  }
  useEffect(() => {
    getIngredients()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Home</Text>
      <Image source={require('../Assets/Logo-Blue.png')}
            style={{width: 100, height: 100 }}/>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('View Available Items')}><Text style={styles.textStyle} >Available Items</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('View Recipes')}><Text style={styles.textStyle}>View Recpies</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Community Items')}><Text style={styles.textStyle} >Community Items</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Shopping list')}><Text style={styles.textStyle} >Shopping List</Text></TouchableOpacity>
      {/* <TouchableOpacity style={styles.button}><Text style={styles.textStyle}>View Required Donations</Text></TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Donate Screen')}><Text style={styles.textStyle}>Donations</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('View Discounts')}><Text style={styles.textStyle}>Restaurents Discounts</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Forum')}><Text style={styles.textStyle}>Forum</Text></TouchableOpacity>

      
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    //backgroundColor: '#071629',
    backgroundColor: '#D9D8D8',
    width: 300,
    height: 35,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    borderRadius: 8,
    left:10,  
    padding: 5,
  },
  headerStyle:{
    fontSize: 60,
    color: '#071629',
    left: 10,
    top: -10,
  },
  textStyle:{
    color:"#071629",
  }
});
