import * as Animatable from 'react-native-animatable';
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import AvailableItem from '../Components/AvailableItem';
import {Container, AddImage} from '../Styles/DonationStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {authcontext} from '../Navigation/AuthenticationProvider';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ViewItemsScreen = ({navigation}) => {
  const [visibility, setVisible] = useState(false);
  const [ItemName, setItemName] = useState(null);
  const [image, setImage] = useState(null);
  const [Type, setType] = useState(null);
  const [Expiredate, setExpireDate] = useState(null);
  const [Qty, setQty] = useState(null);
  const [owner, setOwner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [owners_number, setOwners_number] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [Items, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [Location, setLocation] = useState(null);

  const {user, logout} = useContext(authcontext);
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

  const addItem = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    firestore()
      .collection('Ingredients')
      .add({
        userId: user.uid,
        ItemName: ItemName,
        Type: Type,
        ItemImage: imageUrl,
        PostDate: firestore.Timestamp.fromDate(new Date()),
        Expiredate: Expiredate,
        Qty: Qty,
      })
      .then(() => {
        console.log("Added");
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
    setVisible(false);
  };

  const uploadImage = async () => {
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
      console.log(url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
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
              userId,
              ItemName,
              Type,
              ItemImage,
              PostDate,
              Expiredate,
              Qty,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              ItemName,
              Type,
              ItemImage,
              PostDate,
              Expiredate,
              Qty,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete Item',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('Ingredients')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('Ingredients')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <FlatList
        data={Items}
        renderItem={({item}) => (
          <AvailableItem
            item={item}
            onDelete={handleDelete}
            onClick={deletePost}
            onPress={() =>
              navigation.navigate('Home Screen', {userId: item.userId})
            }
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addBtnStyle}
        onPress={() => setVisible(true)}>
        <View style={{top: 10}}>
          <FontAwesome name="plus" color="#fff" size={30} />
        </View>
      </TouchableOpacity>

      {/* PopUp is starting from here */}
      <Modal transparent={false} visible={visibility}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffffff',
              margin: 50,
              padding: 40,
              width:300,
              height:600,
              borderRadius: 20,
              flex: 1,
              position:'absolute'
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Add Item
            </Text>
            <View style={styles.pictureStyle}>
              {image != null ? (
                <AddImage source={{uri: image}} />
              ) : (
                <TouchableWithoutFeedback>
                  <View style={{top: 27}}>
                    <FontAwesome name="cutlery" color="#05375a" size={60} />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
            {image != null ? null : (
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={takePhotoFromCamera}>
                <View style={{top: 3}}>
                  <FontAwesome name="plus" color="#fff" size={20} />
                </View>
              </TouchableOpacity>
            )}

            <View style={{top: 90}}>
              <TextInput
                placeholder="Product Name"
                onChangeText={setItemName}></TextInput>
              <TextInput placeholder="Type" onChangeText={setType}></TextInput>
              <TextInput
                placeholder="Quantity"
                onChangeText={setQty}></TextInput>
              <TextInput
                placeholder="Expire Dates"
                onChangeText={setExpireDate}></TextInput>
            </View>
            <TouchableOpacity style={styles.submitStyle} onPress={addItem}>
              <Text style={{color: '#fff', alignSelf: 'center'}}>
                Add Item
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};
export default ViewItemsScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#05375a',
    width: 35,
    height: 35,
    borderRadius: 30,
    top: 35,
    left: 140,
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
  pictureStyle: {
    borderRadius: 100,

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
    backgroundColor: '#d4d4d3',
    width: 120,
    height: 120,
    top: 80,
    left: 50,
  },
  submitStyle: {
    backgroundColor: '#05375a',
    top: 90,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  addBtnStyle: {
    alignItems: 'center',
    backgroundColor: '#071629',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -60,
    left: 130,
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
