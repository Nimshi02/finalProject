import React, {useEffect, useContext} from 'react';
import {RecipeName} from '../Styles/RecipeStyle';
import {View, Modal, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';


const Recipe = ({item,onUpdate}) => {
 
  const [visibility, setVisibility] = useState(null);
  const ingredients = JSON.parse(JSON.stringify(item.ingredients));
  const count = item.count;
  const ingredientList = Object.entries(ingredients[0]).map(
    ([ingredient, quantity]) => {
      const amount = quantity * count;
      return (
        <Text key={ingredient}>
          {ingredient}: {amount}
          {'\n'}
        </Text>
      );
    },
  );
  const instructions = JSON.parse(JSON.stringify(item.instructions));
  const instructionsList = instructions.map(instructionObj => {
    const [display_text, instruction] = Object.entries(instructionObj)[0];
    return (
      <Text key={display_text}>
        {instruction}
        {'\n'}
      </Text>
    );
  });

  return (
    <View>
      <TouchableOpacity onPress={() => setVisibility(true)}>
        <View style={styles.card}>
          <RecipeName>
            <Text>{item.name}</Text>
          </RecipeName>
        </View>
      </TouchableOpacity>
      <Modal transparent={false} visible={visibility}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View style={styles.popup}>
            <ScrollView>
              <Text style={{fontSize: 20, color: '#000'}}>Ingredients:</Text>
              <Text style={{fontSize: 18}}>{ingredientList}</Text>
              <Text style={{fontSize: 20, color: '#000'}}>Instructions:</Text>
              <Text style={{fontSize: 18}}>{instructionsList}</Text>
              <Text>
                *Every measurements are performed in grams(g) and milileters(ml)
              </Text>
              <Text style={{fontSize: 22, marginTop: 20, color: '#000'}}>
                Will you make this recipe?
              </Text>
              <TouchableOpacity
                style={styles.submitStyle}
                onPress={() => {onUpdate(item.ingredients,count),setVisibility(false)}}>
                <Text style={{color: '#fff', alignSelf: 'center'}}>Yes</Text>
              </TouchableOpacity>
              <View style={{left: 110, top: -40}}>
                <TouchableOpacity
                  style={styles.submitStyle}
                  onPress={() => setVisibility(false)}>
                  <Text style={{color: '#fff', alignSelf: 'center'}}>No</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Recipe;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: 280,
    height: 105,
    top: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingBottom: 30,
    paddingTop: 30,
    alignItems: 'center',
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
  popup: {
    backgroundColor: '#ffffffff',
    marginBottom: 50,
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    padding: 40,
    borderRadius: 20,
    flex: 1,
  },
  submitStyle: {
    backgroundColor: '#05375a',
    top: 10,
    width: 100,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
