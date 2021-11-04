import React, { useEffect, useContext, useState } from 'react';
import { View, SafeAreaView, Text, FlatList, Image, StyleSheet } from 'react-native';

import { StoreContext } from './../utils/Store';
import apiRequest from '../utils/fetchApi';
import Subreddit from './Subreddit';

const requestEndPoint = 'https://oauth.reddit.com/';

const ProfileScreen = () => (
  <Subreddit requestType={'subreddits/mine/subscriber'}/>
)

export default ProfileScreen;