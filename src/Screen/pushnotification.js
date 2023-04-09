// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     GetFCMToken();
//   }
// }
// async function GetFCMToken() {
//   let fcmtoken = await AsyncStorage.getItem('fcmtoken');
//   console.log(fcmtoken, 'old token');
//   if (!fcmtoken) {
//     try {
//       const fcmtoken = await messaging().getToken();
//       if (fcmtoken) {
//         await AsyncStorage.setItem('fcmtoken', fcmtoken);
//       } else {
//       }
//     } catch (error) {
//       console.log('Error');
//     }
//   }
// }
// export const NotificationListner = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
//   messaging().onMessage(async remoteMessage => {
    
//       if (remoteMessage.data.type === 'ingredientExpired') {
//         // Get the FCM token for the recipient
//         const fcmToken = await AsyncStorage.getItem('fcmtoken');
  
//         // Send the push notification
//         await sendPushNotification(fcmToken, 'Ingredient expiration alert', remoteMessage.notification.body);
//       }
    
//     console.log('notification on foreground state', remoteMessage);
//   });
// };
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

export const fetchPosts = async () => {
  try {
    const list = [];
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const day = tomorrow.getDate().toString().padStart(2, '0');
const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
const year = tomorrow.getFullYear().toString();

const tomorrowString = `${day}/${month}/${year}`;
    await firestore()
      .collection('Ingredients')
      .orderBy('PostDate', 'desc')
      .get()
      .then(querySnapshot => {
        console.log('Total Posts: ', querySnapshot.size);

        querySnapshot.forEach(doc => {
          const expiredate=doc.data().Expiredate;
          console.log(expiredate);
          console.log(tomorrowString);
          if(expiredate==tomorrowString)
          {
            console.log("true");
            sendmsg();
          }
          else{
            console.log("false");
          }
          });
          

      });


    console.log('Posts: ', posts);
  } catch (e) {
    console.log(e);
  }
};


 const  sendmsg=()=>{

const serverKey = 'AAAAnhnGs5Y:APA91bFCsOhyW7cdNMOpiGMWbB5RqHOwBPJeDbVbYr0QtUq6iIS_jZ6PH8tyx5USs2M3wW9qM0XHGOn8MI0jZmuiFxU0FL7CqUBcTcHOHSEgQCSvq5Y7fJY2aUi_vufUgAXax0VCfQVD';
const token = 'dg90aXVbRquZpcpqrXfA5P:APA91bEWmqtMRT4q0TUgV50DU2KXJeG5ekCJ3L_98ZVhoZ1Gdr0bjd0Eqw5NHMNgDgyx49SQecF6KOkaf6dheQFcH488ovC5qSkx6_kbWzN9JJr8iqwgPo1ccU3ow9Rgc0uHveGFrG_Q';

const payload = {
  notification: {
    title: 'Ingredient Expiring Soon',
    body: `Some of your ingredients are expiring tomorrow.`,
  },
  data: {
    screen: 'ingredients',
  },
  to: token,

};
if(1==1){
axios.post('https://fcm.googleapis.com/fcm/send', payload, {
  headers: {
    'Authorization': `key=${serverKey}`,
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    console.log('Notification sent:', response.data);
  })
  .catch((error) => {
    console.error('Error sending notification:', error.response.data);
  });
}
}