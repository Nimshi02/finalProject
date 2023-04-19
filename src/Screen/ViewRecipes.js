import {Container} from '../Styles/RecipeStyle';
import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Recipe from '../Components/Recipe';
import { authcontext } from '../Navigation/AuthenticationProvider';
import firestore from '@react-native-firebase/firestore';

import {useState,useContext} from 'react';
import { ItemName } from '../Styles/RecommendedFoodDeals';
import UndateUserProfile from './UpdateUserProfile';
const ViewRecipes = ({navigation}) => {
  const[textinput,setTextInput]=useState(null);
  const [visibility, setVisibility] = useState(true);
  const [recipe, setRecpie] = useState(false);
  const [userIngredients,setPosts]=useState(null);
  const {user,logout}=useContext(authcontext);
  const loadRecipes = async () => {
    const recipes = [];
    fetch('https://test-service-flask.onrender.com/recipes')
      .then(response => response.json())
      .then(data => {
        data.forEach(recipe => {
          const name = recipe.name;
          const ingredients = recipe.ingredients;
          const instructions = recipe.instructions;

          const recipeobj = {
            count:textinput,
            name,
            ingredients,
            instructions,
          };
          recipes.push(recipeobj);
        });
        setRecpie(recipes);
      })
      .catch(error => console.log(error));
  };

  const fetchPosts = async () => {
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
              ItemName,
              Expiredate,
              Qty,
            } = doc.data();
            list.push({
              ItemName,
              Expiredate,
              Qty,
            });
          });
        });

      setPosts(list);


    } catch (e) {
      console.log(e);
    }
  };
  const updateDatabase=(ingredients,count)=>{
    if(userIngredients==null){
      fetchPosts();
    }  
    else
    {
      fetchPosts();
    }

    Object.entries(ingredients[0]).map(
      ([ingredient, quantity]) => {
        var i=0;
        //console.log(userIngredients[i]);
        //console.log(userIngredients[i].ItemName);
          if (userIngredients[i].ItemName==ingredient)
         console.log(ingredients.length);
          for(i=0;i<ingredients.length;i++)
              {
                console.log("user ingredient : ",userIngredients[i].ItemName);
                console.log(ingredient);
                if (userIngredients[i].ItemName==ingredient)
                {
                  
                  const amount = userIngredients[i].Qty - (count*quantity);
                  console.log(amount);
                  console.log("now updating");
                  updateDetails(ingredient,amount);
                }
              }
      },
    );
  
    // const ingredients = JSON.parse(JSON.stringify(item.ingredients));
    // Object.entries(ingredients[0]).map(
    //   ([ingredient, quantity]) => {
    //     console.log(ingredients)
    //     for(let i=0;i<ingredients.length;i++)
    //     {
    //       if (ingredients[i].ItemName==ingredient)
    //       {
    //         const amount = ingredients[i] - count;
    //         updateDetails(ingredient,amount);
    //       }
    //     }
        
    }

const updateDetails = async (ItemName,amount) => {
  const usersCollection = firestore().collection('Ingredients');
  const query = usersCollection.where('userId', '==', user.uid).where('ItemName','==',ItemName);

  query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.update({
      Qty:amount
      })
    .then(() => {
      console.log('Amount Updated'); 
    });
  })
})
};
  return (
    <Container>
      <View style={styles.screen}>
        <Text style={{color: '#fff', fontSize: 30, top: 30, left: 10}}>
          Whip Up Magic in Your Kitchen!
        </Text>
      </View>
      <View style={{marginTop:170}}>
      <FlatList
        data={recipe}
        renderItem={({item}) => (
          <Recipe
            item={item}
            onUpdate={updateDatabase}
            onPress={() =>
              navigation.navigate('Home Screen', {userId: item.userId})
            }
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      /></View>
      <Modal transparent={false} visible={visibility}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View style={styles.popup}>
            <Text style={{fontSize: 22}}>
              To how many people are you planning to cook for today?
            </Text>
            <TextInput
              placeholder="..............................................................."
              style={{fontSize: 18}}
              autoCapitalize="none"
              onChangeText={val => {
                setTextInput(val);
              }}
            />
            <TouchableOpacity
              style={styles.submitStyle}
              onPress={() => {setVisibility(false);loadRecipes()}}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>OK</Text>
            </TouchableOpacity>
            <View style={{left: 120, top: -40}}>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};
export default ViewRecipes;

const styles = StyleSheet.create({
  screen: {
    top: 10,
    marginBottom: 30,
    width: 320,
    height: 160,
    position: 'absolute',
    borderRadius: 30,
    backgroundColor: '#071629',
  },
  popup: {
    backgroundColor: '#ffffffff',
    marginBottom: 250,
    marginTop: 250,
    marginLeft: 50,
    marginRight: 50,
    padding: 40,
    position:'absolute',
    borderRadius: 20,
    flex: 1,
  },
  submitStyle: {
    backgroundColor: '#05375a',
    top: 10,
    left:60,
    width: 100,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
