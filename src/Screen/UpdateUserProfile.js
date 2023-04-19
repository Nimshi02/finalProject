import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {authcontext} from '../Navigation/AuthenticationProvider';

const UndateUserProfile = ({navigation}) => {
  const [userName, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [userImage, setImage] = useState(null);
  const [contact, setPhone] = useState(null);
  const [about, setAbout] = useState(null);
  const {user, logout} = useContext(authcontext);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await firestore()
        .collection('users')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userName, email, location, userImg, about,contact} = doc.data();
            setEmail(email);
            setImage(userImg);
            setPhone(contact);
            setLocation(location);
            setName(userName);
            setAbout(about);
          });
        });

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    if (userImage == null) {
      return null;
    }
    const uploadUri = userImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      console.log('Inside the function that gives an error');
      console.log(url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const updateDetails = async () => {
    let imgUrl = await uploadImage();
    if (imgUrl == null && userImage) {
      imgUrl = userImage;
    }
    const usersCollection = firestore().collection('users');
    const query = usersCollection.where('userId', '==', user.uid);

    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          userName: userName,
        location: location,
        contact: contact,
        email: email,
        userImg: imgUrl,
        about: about,
        })
      .then(() => {
        Alert.alert('Profile Updated!');
      });
    })
  })
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center'}}>
       {userImage != null ? (
                <Image source={{uri: userImage}} style={{width: 150, height: 150, top: 60, borderRadius: 40}}/>
              ) : (
                <TouchableWithoutFeedback>
                  <View style={{top: 27}}>
                   <Image source={require('../Assets/testImage.jpg')}
                   style={{width: 150, height: 150, top: 60, borderRadius: 40}}/>
                  </View>
                </TouchableWithoutFeedback>
              )}
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={takePhotoFromCamera}>
        <View style={{top: 3}}>
          <FontAwesome name="plus" color="#fff" size={20} />
        </View>
      </TouchableOpacity>
      {/* Value fields */}
      <View style={{flexDirection: 'row', top: 290,left:170,position:'absolute'}}>
        <Text style={{fontSize: 18, position: 'absolute', left: -143}}>
          Email
        </Text>
        <View style={{position: 'absolute', left: -40}}>
          <FontAwesome name="envelope-o" color="#05375a" size={23} />
        </View>
        <View style={{left: 20, top: -8}}>
          <TextInput
            value={email}
            autoCapitalize="none"
            onChangeText={val => {
              setEmail(val);
            }}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', left:170,top: 330,position:'absolute'}}>
        <Text style={{fontSize: 18, position: 'absolute', left: -143}}>
          Name
        </Text>
        <View style={{position: 'absolute', left: -40}}>
          <FontAwesome name="user-o" color="#05375a" size={23} />
        </View>
        <View style={{left: 20, top: -8}}>
          <TextInput
            value={userName}
            autoCapitalize="none"
            onChangeText={val => {
              setName(val);
            }}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', top: 370,left:170,position:'absolute'}}>
        <Text style={{fontSize: 18, position: 'absolute', left: -143}}>
          Location{' '}
        </Text>
        <View style={{position: 'absolute', left: -40}}>
          <FontAwesome name="map-marker" color="#05375a" size={30} />
        </View>
        <View style={{left: 10, top: -8}}>
          <TextInput
            value={location}
            autoCapitalize="none"
            onChangeText={val => {
              setLocation(val);
            }}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', top: 410,position:'absolute',left:170}}>
        <Text style={{fontSize: 18, position: 'absolute', left: -143}}>
          Contact{' '}
        </Text>
        <View style={{position: 'absolute', left: -40}}>
          <FontAwesome name="mobile" color="#05375a" size={30} />
        </View>
        <View style={{left: 16, top: -8}}>
          <TextInput
            value={contact}
            autoCapitalize="none"
            onChangeText={val => {
              setPhone(val);
            }}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', top: 450,position:'absolute',left:170}}>
        <Text style={{fontSize: 18, position: 'absolute', left: -143}}>
          About{' '}
        </Text>
        <View style={{position: 'absolute', left: -40}}>
          <FontAwesome name="file-text-o" color="#05375a" size={23} />
        </View>
        <View style={{left: 20, top: -8}}>
          <TextInput
            value={about}
            autoCapitalize="none"
            onChangeText={val => {
              setAbout(val);
            }}
          />
        </View>
      </View>
      <View style={{position:"absolute",top:400}}>
      <TouchableOpacity style={styles.submitStyle} onPress={updateDetails}>
        <Text style={{color: '#fff', alignSelf: 'center'}}>Update</Text>
      </TouchableOpacity>
      <View style={{top: 20}}>
        <TouchableOpacity
          style={styles.submitStyle}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={{color: '#fff', alignSelf: 'center'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};
export default UndateUserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071629',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
  },
  header_Text: {
    fontSize: 60,
    color: '#fff',
    left: 10,
    top: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  submitStyle: {
    backgroundColor: '#071629',
    top: 130,
    width: 240,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footer_text: {
    fontSize: 18,
  },
  TextInput: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 40,
    fontSize: 30,
    color: '#05375a',
  },
  eyeslach: {
    alignItems: 'flex-start',
    top: -50,
    left: 320,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },

  text: {
    color: 'grey',
    marginTop: 2,
    margineEnd: 5,
    fontSize: 25,
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 110,
    flexDirection: 'row',
  },
  TextInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 17,
    color: '#000000',

    fontFamily: 'Roboto-Medium',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  buttonStyle: {
    position:'absolute',
    alignItems: 'center',
    backgroundColor: '#05375a',
    width: 35,
    height: 35,
    borderRadius: 30,
    top: 180,
    left: 240,
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
});
