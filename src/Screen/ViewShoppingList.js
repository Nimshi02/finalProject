import * as Animatable from 'react-native-animatable';
import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import ShoppingItem from '../Components/ShoppingItem';
import {Container, Card} from '../Styles/ShoppingListStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {authcontext} from '../Navigation/AuthenticationProvider';
import firestore from '@react-native-firebase/firestore';
const ShoppingItems = [
  {
    id: '1',
    ItemName: 'Burger',
  },
  {
    id: '2',
    ItemName: 'Cream Cheese',
  },
  {
    id: '3',
    ItemName: 'Pastry',
  },
  {
    id: '4',
    ItemName: 'Pasta',
  },
];
const ViewShoppingList = ({navigation}) => {
    const {user, logout} = useContext(authcontext);
  const [visibility, setVisible] = useState(null);
  const [ItemName, setItemName] = useState(null);
  const[ShoppingItems,setItemList]=useState(null);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    fechItems();
  }, []);
  const AddItems= async() => { 
      firestore()
      .collection('ShoppingItems')
      .add({
        userId:user.uid,
        ItemName:ItemName,
        ItemPostedDate:firestore.Timestamp.fromDate(new Date()),

      })
      .then(() => {
        console.log('Shopping Item added manually');
        alert('Item Added!');
      })
      .catch(error => {
        console.log(
          'Something went wrong with added item to firestore.',
          error,
        );})
   setVisible(false)
  }
  const fechItems= async () =>{
    try {
      const list = [];

      await firestore()
        .collection('ShoppingItems')
        // .orderBy('ItemPostedDate', 'desc')
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {
              userId,
              ItemName
                        } = doc.data();
            list.push({
              id: doc.id,
              userId,
              ItemName,
             
            });
          });
        });

        setItemList(list);


      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    fechItems();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteFirestoreData(postId),
        },
      ],
      {cancelable: false},
    );
  };
  const deleteFirestoreData = postId => {
    firestore()
      .collection('ShoppingItems')
      .doc(postId)
      .delete()
      .then(() => {
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };
  return (
    <Container>
      <FlatList
        data={ShoppingItems}
        renderItem={({item}) => <ShoppingItem item={item} onDelete={handleDelete} onClick={deleteFirestoreData}/>}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setVisible(true)}>
        <View style={{top: 10}}>
          <FontAwesome name="plus" color="#fff" size={30} />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={false}
        visible={visibility}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          position: 'absolute',
        }}
        avoidKeyboard={false}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffffff',
              margin: 50,
              top: 70,
              height: 320,
              padding: 20,
              borderRadius: 20,
              position: 'absolute',
              flex: 1,
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Add to shopping list
            </Text>
            <TextInput
              placeholder="Item Name"
              onChangeText={setItemName}></TextInput>

            <TouchableOpacity style={styles.submitStyle} onPress={AddItems}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>
                Add Items
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.CancelStyle}
              onPress={() => setVisible(false)}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};
export default ViewShoppingList;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#d0c6c6',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -30,
    left: 300,
    padding: 5,
    shadowColor: '#9f9393',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  submitStyle: {
    backgroundColor: '#05375a',
    top: 30,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  CancelStyle: {
    backgroundColor: '#05375a',
    top: 60,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
