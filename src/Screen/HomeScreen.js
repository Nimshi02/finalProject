import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import react, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {authcontext} from '../Navigation/AuthenticationProvider';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBurger} from '@fortawesome/free-solid-svg-icons';
import {faBowlRice} from '@fortawesome/free-solid-svg-icons';
import {faSeedling} from '@fortawesome/free-solid-svg-icons';
import {faPlateWheat} from '@fortawesome/free-solid-svg-icons';
import {faMoneyBillWheat} from '@fortawesome/free-solid-svg-icons';
import {faComments} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(authcontext);
  const [items, setItems] = useState(null);
  const [userName, setUserName] = useState(null);
  const [time, setTime] = useState(null);
  const getIngredients = async () => {
    console.log('now running this');
    try {
      const list = [];

      await firestore()
        .collection('Ingredients')
        .orderBy('PostDate', 'desc')
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {userId, ItemName, Expiredate, Qty} = doc.data();
            list.push({
              docId: doc.id,
              userId,
              ItemName,
              Expiredate,
              Qty,
            });
          });
        });

      setItems(list);
      if (list != null) {
        updateIngredients_and_addToShoppingList();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateIngredients_and_addToShoppingList = async () => {
    var i = 0;
    for (i = 0; i < items.length; i++) {
      if (items[i].ItemName != 'eggs') {
        console.log('not an egg');
        if (items[i].Qty <= 50) {
          console.log('running this');
          firestore()
            .collection('ShoppingItems')
            .add({
              userId: user.uid,
              ItemName: items[i].ItemName,
              ItemPostedDate: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              console.log('Shopping Item added automatically');
              alert('Item Added!');
            })
            .catch(error => {
              console.log(
                'Something went wrong with added item to firestore.',
                error,
              );
            });
        }
        if (items[i].Qty < 0) {
          console.log('next delete this');
          console.log(items[i].docId);
          firestore()
            .collection('Ingredients')
            .doc(items[i].docId)
            .delete()
            .then(() => {
              alert('deletedSuccessfully');
            })
            .catch(e => console.log('Error deleting posst.', e));
        }
      }
    }
  };

  const fetchData = async () => {
    try {
      await firestore()
        .collection('users')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {userName} = doc.data();
            setUserName(userName);
          });
        });

      //set time
      const date = new Date();
      const currentHour = date.getHours();
      const currentDate = date.getDate();
      if (currentHour >= 0 && currentHour < 12) {
        setTime('Morning');
      } else if (currentHour >= 12 && currentHour < 16) {
        setTime('Afternoon');
      } else {
        setTime('Evening');
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getIngredients();
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={['#071629', '#ffffff']}
      style={styles.container}
      start={{x: 0, y: 1}}
      end={{x: 6, y: 3}}>
      <View style={{top:35, alignSelf:'center'}}><Image
        source={require('../Assets/Logo-White.png')}
        style={{width: 125, height: 125}}
      /></View>
      <View style={{top: 50, alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
          {' '}
          Good {time} {userName}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('View Available Items')}>
            <View style={styles.card}>
              <View style={{alignItems: 'center', top: 30}}>
                <FontAwesomeIcon icon={faBurger} size={50} color="#071629" />
              </View>
              <View style={{top: 40, alignItems: 'center'}}>
                <Text style={{size: 40, color: '#071629', fontWeight: 'bold'}}>
                  Available Items
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('View Recipes')}>
            <View style={styles.card}>
              <View style={{alignItems: 'center', top: 30}}>
                <FontAwesomeIcon icon={faBowlRice} size={50} color="#071629" />
              </View>
              <View style={{top: 40, alignItems: 'center'}}>
                <Text style={{size: 40, color: '#071629', fontWeight: 'bold'}}>
                  View Recipes
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Community Items')}>
            <View style={styles.card}>
              <View style={{alignItems: 'center', top: 30}}>
                <FontAwesomeIcon icon={faSeedling} size={50} color="#071629" />
              </View>
              <View style={{top: 40, alignItems: 'center'}}>
                <Text style={{size: 40, color: '#071629', fontWeight: 'bold'}}>
                  Community Items
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Donate Screen')}>
            <View style={styles.card}>
              <View style={{alignItems: 'center', top: 30}}>
                <FontAwesomeIcon
                  icon={faPlateWheat}
                  size={50}
                  color="#071629"
                />
              </View>
              <View style={{top: 40, alignItems: 'center'}}>
                <Text style={{size: 40, color: '#071629', fontWeight: 'bold'}}>
                  Donations
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('View Discounts')}>
            <View style={styles.card}>
              <View style={{alignItems: 'center', top: 30}}>
                <FontAwesomeIcon
                  icon={faMoneyBillWheat}
                  size={50}
                  color="#071629"
                />
              </View>
              <View style={{top: 40, alignItems: 'center'}}>
                <Text style={{size: 40, color: '#071629', fontWeight: 'bold'}}>
                  Restaurent Discounts
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Forum')}>
            <View style={styles.card}>
              <View style={{alignItems: 'center', top: 30}}>
                <FontAwesomeIcon icon={faComments} size={50} color="#071629" />
              </View>
              <View style={{top: 40, alignItems: 'center'}}>
                <Text style={{size: 40, color: '#071629', fontWeight: 'bold'}}>
                  Forum
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    height: '40%',
  },
  half: {
    width: '100%',
  },
  curved: {
    borderBottomLeftRadius: 1150 / 2,
    // borderBottomRightRadius: 100,
    borderBottomEndRadius: 120,
    borderBottomRadius: 30,
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    height: 135,
    top: 30,
    left: 30,
    marginBottom: 10,
    marginRight: 30,

    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#071629',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 6,
  },
  card2: {
    backgroundColor: '#fff',
    width: 150,
    height: 135,
    top: 30,
    left: -40,
    marginBottom: 10,
    marginRight: 10,

    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#071629',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 6,
  },
});
