import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, AsyncStorage } from 'react-native';
import axios from 'axios';
import FavoriteTruck, {
  FavoriteTruck as ListModelFavoriteTruck,
} from './FavoriteTruck';
import Badges, { Badges as ListModelBadges } from './Badges';
import Settings, { Settings as ListModelSettings } from './Settings';
// import Userimport { log } from 'react-native-reanimated';
import Posts, { UserPosts as ListModelUserPosts } from './UserPosts';
import getAchievements from './Achievements';

let imageT;

// can do use effect on clicking badges open if not updating.

const favoriteTrucks: ListModelFavoriteTruck = {
  name: 'User Profile Demo',
  items: [{ name: 'truck here', points: 'Favorites To Go Here' }],
};

const badges: ListModelBadges = {
  name: 'Badges',
  items: [{ name: 'badge', points: '', image: imageT }],
};

const settings: ListModelSettings = {
  name: 'Settings',
  items: [{ name: 'Profile', points: 'Settings to go here' }],
};

const userPosts: ListModelUserPosts = {
  name: 'User Posts',
  items: [{ name: 'User Posts', points: 'User Posts Go Here' }],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default () => {
  let googleData;
  let userData;
  const [getUser, setGetUser] = useState([{
    badge: {
      badge1: {
        description: '',
        logo: '',
        qrCode: '',
        title: '',
        unlocked: false,
      }
    }
  }]);
  useEffect(() => {
    const retrieveData = async () => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          googleData = JSON.parse(value);
          googleData = googleData.user;
          return googleData;
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveData().then(() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleData.id}`)
        .then((response) => {
          // userData = response.data;
          // userData = 'test'
          // console.log('USER DATA NUMBER', userData);
          // console.log('response.data', response.data)
          setGetUser(response.data);
          console.log('response.data from right after setting stat', response.data)
          // console.log('getUser', getUser)
          // [
          //   Object {
          //     "badge": Object {
          //       "badge1": Object {
          //         "description": "desc",
          //         "logo": "require('../../assets/foodtruckstillsmall.png')",
          //         "qrCode": "qr",
          //         "title": "title",
          //         "unlocked": false,
          //       },
          //       "badge2": Object {
          //         "description": "desc",
          //         "logo": "png",
          //         "qrCode": "qr",
          //         "title": "title",
          //         "unlocked": false,
          //       },
          //       "badge3": Object {
          //         "description": "desc",
          //         "logo": "png",
          //         "qrCode": "qr",
          //         "title": "title",
          //         "unlocked": false,
          //       },
          //       "badge4": Object {
          //         "description": "desc",
          //         "logo": "png",
          //         "qrCode": "qr",
          //         "title": "title",
          //         "unlocked": false,
          //       },
          //     },
          //     "full_name": "Christopher Stumpe",
          //     "google_id": "118399439918550957762",
          //     "id": 2,
          //     "profile_photo_url": "https://res.cloudinary.com/ds4z8idpg/image/upload/v1599777028/nhhdk8vszyf0t3kzlun5.jpg",
          //   },
          //   false,
          // ]
          return response.data
        })
        .then((test)=> {
          // console.log('getUser', getUser[0])
          console.log('what we should be returning from this call')
          // imageT = getAchievements(getUser);
          // console.log('imageT', imageT);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {/* <Text>{getUser[0].badge.badge1.description}</Text> */}
      <Image source={require(getAchievements(getUser))} />
      <FavoriteTruck {...{ favoriteTrucks }} />
      <Badges {...{ badges }} />
      <Settings {...{ settings }} />
      {/* <UserPosts {...{ userPosts }} /> */}
    </ScrollView>
  );
};
