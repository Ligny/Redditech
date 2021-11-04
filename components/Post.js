import React, { useEffect, useContext, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, Image, BackHandler, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import apiRequest from '../utils/fetchApi'
import { StoreContext } from '../utils/Store';

const requestEndPoint = 'https://oauth.reddit.com/';

const Interactables = () => {
  return (
  <View style={styles.interactables}>
    <Ionicons name='arrow-up-circle-outline' size={40}/>
    <Ionicons name='arrow-down-circle-outline' size={40}/>
  </View>
  );
}

const renderItem = ({ item }, isDark) => {
    return (
        <View style={[styles.post, {backgroundColor: isDark ? 'black' : 'white'}]}>
          <Text style={styles.author}>{`Publiée par u/${item.author}`}</Text>
          <Text style={styles.title} >{item.title}</Text>
          <Text style={styles.content} >{item.text}</Text>
          {item.image ? <Image style={styles.image} source={{ uri: item.image}}/> : <></>}
          <Interactables/>
        </View>
    );
  }

const Post = ({ sortType }) => {
    const { isAuthenticated, isDarkMode, isPost, setIsPost } = useContext(StoreContext);
    const [id, setId] = useState();
    const [reload, setReload] = useState(false);
    const [post, setPost] = useState([]);
    const [tmp, setTmp] = useState(false)

    const BackButtonHandler = () => {
      setIsPost({subreddit:null, post: false});
      return true;
    }

    useEffect(() => {
      apiRequest(`${requestEndPoint}${isPost.subreddit}/${sortType}?after${id}`,'GET', isAuthenticated.accessToken)
      .then(response => {
        const lastId = response.data.children[response.data.children.length - 1].data.id;
        setId(lastId);
        setPost(post.concat(response.data.children.map((element) => {
          return (
            {
              title: element.data.title,
              text: element.data.selftext,
              author: element.data.author,
              image: element.data.url_overridden_by_dest,
              id: element.data.id
            }
          )
        })))
      })
      .catch((error) => console.log(error));
      setReload(false);
      console.log('done');
    }, [reload, sortType])

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', BackButtonHandler);
  
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", BackButtonHandler);
      };
    }, [BackButtonHandler]);

    return (
      <FlatList
        data={post}
        renderItem={( item ) => renderItem(item, isDarkMode)}
        keyExtractor={item => item.id}
        onEndReached={() => setReload(true)}
        maxToRenderPerBatch={6}
        windowSize={5}
      />
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      backgroundColor: '#DFDFDF'
    },
    post: {
      marginBottom: 10,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    title: {
      fontSize: 20,
      marginTop: 5,
      marginHorizontal: 5,
      fontWeight: 'bold',
    },
    author: {
      marginLeft: 5,
      marginVertical:5,
      fontFamily: 'monospace',
      fontSize:10,
    },
    content: {
      fontSize: 15,
      marginHorizontal: 5,
      marginTop: 5,
      marginBottom: 15,
      fontFamily: 'Roboto',
    },
    image: {
      aspectRatio:1,
      resizeMode: 'contain'
    },
    interactables: {
      flexDirection: 'row',
      marginVertical: 5,
      marginHorizontal: 5,
      justifyContent:'center',
      alignItems:'center',
    },
})

export default Post;