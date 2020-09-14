import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, AsyncStorage } from 'react-native';
import axios from 'axios';
import Badges, { Badges as ListModelBadges } from './Badges';

// need name of badge and image
// need to reach db to get the thingy

export default (user) => {
  console.log('how about here?')
  return user[0].badge.badge1.logo
};

// Build a function, that returns an object. 
  // the function will be exported to accordian for badges
  // it will build the badge friendly object based on the user
  // also process acheivement progress

// const badges: ListModelBadges = {
//   name: 'Badges',
//   items: [{ name: 'badge', points: '', image: imageT }],
// };
// const imageT = require('../../assets/foodtruckstillsmall.png');
// module.exports = { getAchievements }