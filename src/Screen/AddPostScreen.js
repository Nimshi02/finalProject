// import React, { useState } from "react";
// import {StyleSheet,View, Text, TouchableWithoutFeedback,Animated,Image,Alert} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {InputField, InputWrapper,AddImage} from '../Styles/AddPostStyle';
// import ImagePicker from 'react-native-image-crop-picker';

// const AddPostScreen=({navigation}) =>{
//   const [image, setImage] = useState(null);

//     const takePhoto = () => {
//         ImagePicker.openCamera({
//           width: 1200,
//           height: 780,
//           cropping: true,
//         }).then((image) => {
//           alert(image);
//           console.log(image);
//         const imageUri = Platform.OS === 'android' ? image.sourceURL : image.path;
//           setImage(imageUri);
//         });
//       };

//       const SelectPhoto = () => {
//         ImagePicker.openPicker({
//           width: 1200,
//           height: 780,
//           cropping: true,
//         }).then((image) => {
//           console.log(image);
//           const imageUri = Platform.OS === 'android' ? image.sourceURL : image.path;
//           setImage(imageUri);
//         });
//       };

//     return (

//        <InputWrapper>
//        {image != null ?<AddImage source={require('../Assets/Logo-White.png')} />: <AddImage source={require('../Assets/Logo-Blue.png')} />}
//          {/* {image != null ? <AddImage source={{uri:image}} /> : null} */}
//        <InputField
//        placeholder="Whats on your mind?"
//        multiline
//         numberOfLines={4}
// />
//            <View style={{top:180, left:120}}>
//            <TouchableWithoutFeedback onPress={takePhoto}>
//            <Animated.View style={[styles.buttonStyle,CameraStyle] }><View style={{top:10}}><FontAwesome
//               name="camera" color="#fff" size={30}/></View>
//            </Animated.View>
//            </TouchableWithoutFeedback>
//            <TouchableWithoutFeedback onPress={SelectPhoto}>
//            <Animated.View style={[styles.buttonStyle, GalleryStyle]}><View style={{top:10}}><FontAwesome
//         name="picture-o" color="#fff" size={30}/></View>
//            </Animated.View>
//            </TouchableWithoutFeedback>
//           <TouchableWithoutFeedback onPress={this.toggleMenu}>
//            <Animated.View style={styles.buttonStyle}><View style={{top:10}} ><FontAwesome
//               name="plus" color="#fff" size={30}/></View>
//            </Animated.View>
//            </TouchableWithoutFeedback>
//            </View>
//        </InputWrapper>

//     )
// }
// export default AddPostScreen;

import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../Styles/AddPostStyle';

import { authcontext } from '../Navigation/AuthenticationProvider';
const AddPostScreen = () => {
  const {user,logout}=useContext(authcontext);
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();

    this.open = this.open;
  };
  const GalleryStyle = {
    transform: [
      {scale: this.animation},
      {
        translateY: this.animation.interpolate({
          inputRange: [0, 0.87],
          outputRange: [0, -60],
        }),
      },
    ],
  };
  const CameraStyle = {
    transform: [
      {scale: this.animation},
      {
        translateY: this.animation.interpolate({
          inputRange: [0, 0.87],
          outputRange: [0, -120],
        }),
      },
    ],
  };

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

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

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);
    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        setPost(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const uploadImage = async () => {
    alert(image)
    if (image == null) {
      return null;
    }
    const uploadUri = image;
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
      console.log("Inside the function that gives an error");
      console.log(url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}

        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={content => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>

      <TouchableWithoutFeedback onPress={takePhotoFromCamera}>
        <Animated.View style={[styles.buttonStyle, CameraStyle]}>
          <View style={{top: 10}}>
            <FontAwesome name="camera" color="#fff" size={30} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={choosePhotoFromLibrary}>
        <Animated.View style={[styles.buttonStyle, GalleryStyle]}>
          <View style={{top: 10}}>
            <FontAwesome name="picture-o" color="#fff" size={30} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={this.toggleMenu}>
        <Animated.View style={styles.buttonStyle}>
          <View style={{top: 10}}>
            <FontAwesome name="plus" color="#fff" size={30} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  buttonStyle: {
    left: 300,
    top: 580,
    backgroundColor: '#000',

    position: 'absolute',
    borderRadius: 30,

    padding: 5,
    shadowColor: '#9f9393',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
    backgroundColor: '#d0c6c6',
    width: 60,
    height: 60,
  },
});
