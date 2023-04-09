// // import React from "react";
// // import { StyleSheet,View, Text } from "react-native";
// // const viewRestuarentsItems = ({navigation}) =>{
// //     return(
// // <View styles={styles.container}>
// //     <Text style={styles.headerStyle}>Choose Among Variety Of Food Discounts</Text>
// // </View>

// // )}
// // export default viewRestuarentsItems;

// // const styles = StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       backgroundColor: '#fff',
// //     },
// //     headerStyle:{
// //         fontSize:30
// //     }
// // })

// import React from 'react';
// import { useEffect, useState } from 'react';
// import {View, Text, SafeAreaView, StyleSheet,FlatList} from 'react-native';
// import {Header} from 'react-native-elements';
// import storage from '@react-native-firebase/storage';
// import firestore from '@react-native-firebase/firestore';

// const ViewRestuarentsItems = () => {
// const [resId,setresId]=useState(null);
// const[ItemName,setItemName]=useState(null);
// const[Type,setType]=useState(null);
// const[ItemImage,setItemImage]=useState(null);
// const[PostDate,setPostDate]=useState(null);
// const[ValidDate,setValidDate]=useState(null);
// const[description,setDescription]=useState(null);
// const[discountRate,setDiscountRate]=useState(null);
// const[RecommendItems,setRecomendedItems]=useState(null);
// const[TopItmes,setTopItems]=useState(null);
//   const FetchRecommendedItems = async () => {
//     try {
//       const list = [];

//       await firestore()
//         .collection('FoodDeals')
//         .orderBy('PostDate', 'desc')
//         .get()
//         .then(querySnapshot => {
//           console.log('Total R: ', querySnapshot.size);

//           querySnapshot.forEach(doc => {
//             const {
//               resId,
//               ItemName,
//               Type,
//               ItemImage,
//               PostDate,
//               ValidDate,
//               description,
//               discountRate
//             } = doc.data();
//             list.push({
//               resId,
//               ItemName,
//               Type,
//               ItemImage,
//               PostDate,
//               ValidDate,
//               description,
//               discountRate
//             });
//           });
//         });

//         setRecomendedItems(list);

//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const fetchTopItems = async () => {
//     try {
//       const list = [];

//       await firestore()
//         .collection('FoodDeals')
//         .orderBy('PostDate', 'desc')
//         .get()
//         .then(querySnapshot => {
//           console.log('Total T: ', querySnapshot.size);

//           querySnapshot.forEach(doc => {
//             const {
//               resId,
//               ItemName,
//               Type,
//               ItemImage,
//               PostDate,
//               ValidDate,
//               description,
//               discountRate
//             } = doc.data();
//             list.push({
//               resId,
//               ItemName,
//               Type,
//               ItemImage,
//               PostDate,
//               ValidDate,
//               description,
//               discountRate
//             });
//           });
//         });

//       setTopItems(list);

  

//       console.log('Top: ', posts);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   useEffect(() => {
//     FetchRecommendedItems();
//   }, []);
//   // useEffect(() => {
//   //   fetchTopItems();
//   // }, []);
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         containerStyle={styles.header}
//         statusBarProps={{backgroundColor: 'black'}}
//       />
//       <View style={styles.content}>
//         <Text style={styles.headerStyle}>
//           Get Ready for <Text style={styles.emphazie}>Discounts!</Text>
//         </Text>
//         <Text>Recomended</Text>
//         <FlatList
//         data={RecommendItems}
//         // horizontal={true}
//         renderItem={({item}) => (
//           <RFoodDealCard
//             item={item}
//             onPress={() =>
//               navigation.navigate('Home Screen', {userId: item.userId})
//             }
//           />
//         )}
//         keyExtractor={item => item.id}
//       />
//         <Text>Top Food Deals</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// 

// export default ViewRestuarentsItems;

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  Image
} from 'react-native';
import {Header} from 'react-native-elements';
import RFoodDealCard from '../Components/RecomendedFoodDeals';
import firestore from '@react-native-firebase/firestore';
import { fontWeight } from '@mui/system';

const ViewRestuarentsItems = ({navigation}) => {

  const [RecomendedDeals, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const[TopDeals,setTopDeals]=useState(null);

  const FetchRecommendFood = async () => {
    try {
      const list = [];

      await firestore()
        .collection('FoodDeals')
        .orderBy('PostDate', 'desc')
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {
              resId,
              ItemName,
              Type,
              ItemImage,
              PostDate,
              ValidDate,
              resName,
              description,
              discountRate,
              resAddress
            } = doc.data();
            list.push({
              resId,
              ItemName,
              Type,
              ItemImage,
              PostDate,
              ValidDate,
              description,
              resName,
              discountRate,
              resAddress
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

    } catch (e) {
      console.log(e);
    }
  };

  const FetchTopDealsFood = async () => {
    try {
      const list = [];

      await firestore()
        .collection('FoodDeals')
        .orderBy('PostDate', 'desc')
        .get()
        .then(querySnapshot => {
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {
              resId,
              ItemName,
              Type,
              ItemImage,
              PostDate,
              ValidDate,
              description,
              discountRate
            } = doc.data();
            list.push({
              resId,
              ItemName,
              Type,
              ItemImage,
              PostDate,
              ValidDate,
              description,
              discountRate
            });
          });
        });

      setTopDeals(list);

      if (loading) {
        setLoading(false);
      }

    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchRecommendFood();
  }, []);
  useEffect(() => {
    FetchTopDealsFood();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
       <Header
        containerStyle={styles.header}
        statusBarProps={{backgroundColor: 'black'}}
      />
       <View style={styles.content}>
        <Text style={styles.headerStyle}>
           Get Ready for Discounts!
        </Text>
        <View style={styles.screen}><Text style={{color:"#fff",fontSize:30,top:30,left:20}}>Best Meals With Discount</Text></View>
        <View><Image source={require('../Assets/fruitBowl.png')}
            style={{width: 150, height: 150, top: -60, left: 190}}/></View>
        <View style={styles.body}>
         <Text style={styles.subHeadding}>Recomended</Text>
         <View style={{top:20}}>
      <FlatList
        data={RecomendedDeals}
        horizontal={true}
        renderItem={({item}) => (
          <RFoodDealCard
            item={item}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      /></View>
      </View></View>
</SafeAreaView>
  );
};
export default ViewRestuarentsItems;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: 40,
      paddingRight:40
    },
    header: {
      backgroundColor: 'white',
      borderWidth: 0,
      borderBottomColor: 'white',
      elevation: 0,
      height: 50,
      paddingTop: 0,
    },
    body:{
      top:-80
        },
    content: {
      // flex: 1,
      // justifyContent: 'center',
      alignItems: 'flex-start',
      top:-10,
    },
    headerStyle: {
      fontSize: 35,
      color: '#000',
      fontWeight:'bold'
    },
    subHeadding:{
      fontSize:20,
      fontWeight:'bold',
      color:'#000'
    },
    screen:{
      top:30,
      width:320,
      height:160,
      borderRadius:30,
      backgroundColor:'#071629',
    }
  });

