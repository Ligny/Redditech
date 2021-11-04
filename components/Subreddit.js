import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import numeral from 'numeral';

import { StoreContext } from '../utils/Store';
import apiRequest from '../utils/fetchApi'

const requestEndPoint = 'https://oauth.reddit.com/';

const renderItem = ({ item }, isDark, setIsFav, setIsPost ) => {
  return (
    <Pressable android_ripple={{color:'#FF4500'}} style={[styles.subreddit, {backgroundColor: isDark ? '#171717' : 'white'}]} onPress={() => setIsPost({subreddit: item.name, post: true})}>
      <Image style={styles.subimage} source={item.image ? {uri: item.image} : require('../assets/reddit-1.webp')}/>
      <Text style={[styles.subname, {color: isDark ? 'white' : 'black'}]}>{item.name}</Text>
      <Text style={[styles.subnumber, {color: isDark ? 'white' : 'black'}]} >{item.subscribers > 999 ? numeral(item.subscribers).format('O.OOa') : item.subscribers}</Text>
      <AntDesign style={styles.subfav} name={item.favorite ? "star" : "staro"} color='grey' size={30}/>
    </Pressable>
  );
}

const Subreddit = ( {requestType} ) => {
  const { isAuthenticated, isDarkMode, setIsPost } = useContext(StoreContext);
  const [Subreddit, setSubreddit] = useState([]);
  const [isFav, setIsFav] = useState({name: '', favorite: false})

  useEffect(() => {
    apiRequest(`${requestEndPoint}${requestType}`, 'GET', isAuthenticated.accessToken)
    .then((response) => {
      setSubreddit(response.data.children.map((element) => (
        {
          name: element.data.display_name_prefixed,
          subscribers: element.data.subscribers,
          image: element.data.community_icon.split('?')[0],
          favorite: element.data.user_has_favorited,
          id: element.data.id
        }
      )))
    })
    .catch((error) => console.log(error));      <View style={{height:100}}/>

  }, [requestType]);

  useEffect(() => {
    if (isFav.name != '') {
      fetch(requestEndPoint + `api/favorite?raw_json=1&gilding_detail=1`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${isAuthenticated.accessToken}`
        },
        body: {
          sr_name: isFav.name,
          make_favorite: isFav.favorite
        }
      })
      .then((res) => res.json())
      .then((yes) => console.log(yes))
      .catch((error) => {
        console.log(error);
      });
    }
  }, [isFav]);

  return (
    <SafeAreaView>
      <FlatList
        data={Subreddit}
        renderItem={( item ) => renderItem(item, isDarkMode, setIsFav, setIsPost)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subreddit: {
    marginTop: 1,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10
  },
  subimage: {
    flex: 0.3,
    width: 40,
    height: 40,
    borderRadius: 200,
    justifyContent: 'center',
    resizeMode: 'center'
  },
  subname: {
    flex: 1,
    fontFamily: 'sans-serif-medium'
  },
  subnumber: {
    flex: 0.3,
    fontFamily: 'monospace'
  },
  subfav: {
    flex: 0.2,
  }
})

export default Subreddit;