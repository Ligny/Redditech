import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, Switch, Image, StyleSheet, Dimensions } from 'react-native';
import { StoreContext } from './../utils/Store';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import apiRequest from '../utils/fetchApi'
const requestEndPoint = 'https://oauth.reddit.com/';

const SettingsScreen = () => {
    const { isDarkMode, setIsDarkMode, isAuthenticated } = useContext(StoreContext);
    const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
    const [user, setUser] = useState([]);

    useEffect(() => {
      apiRequest(`${requestEndPoint}api/v1/me`, 'GET', isAuthenticated.accessToken)
      .then((response) => {
        const { name, snoovatar_img, total_karma, subreddit } = response;
        setUser({
          name: name,
          img: snoovatar_img,
          karma: total_karma,
          subscribers: subreddit.subscribers,
          banner_img: subreddit.banner_img.split('?')[0],
          description: subreddit.public_description,
        });
        console.log(user);
      })
      .catch((error) => console.log(error));
    }, [])

    const ProfileInfo = ({name, value, img}) => {
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:20}}>
        <MaterialCommunityIcons name={img} color='grey' size={40}/>
        <View style={{flexDirection:'column', alignItems: 'center', marginLeft: 20}}>
          <Text style={[styles.infoValue, {color:isDarkMode ? 'white' : 'black'}]}>{value}</Text>
          <Text style={[styles.infoName, {color:isDarkMode ? 'white' : 'black'}]}>{name}</Text>
        </View>
      </View>
      )
    }

    const DisplayProfile = () => {
      return (
        <View style={{marginVertical:30}}>
            <Image style={{ width: 100, height: 150}} source={{ uri: user.img}}/>
            <Text style={[styles.pseudo, {color: isDarkMode ? 'white' : 'black' }]} >u/{user.name}</Text>
            <Text style={{fontFamily: 'monospace'}}>{user.description}</Text>
        </View>
      )
    }

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      {user.banner_img ? <Image style={{ width: Dimensions.get('window').width, height: 200}} source={{ uri: user.banner_img}}/> : <></>}
      <DisplayProfile/>
        <View style={{flexDirection:'row'}}>
          <ProfileInfo name="karma" value={user.karma} img="gift"/>
          <ProfileInfo name="followers" value={user.subscribers} img="bell"/>
      </View>
      <View style={{flexDirection: 'row', alignItems:'center', marginTop:175}}>
        <Feather name={isDarkMode ? "moon" : "sun"} color='grey' size={40}/>
        <Text style={{fontSize:20, marginHorizontal: 20, fontWeight:'bold', color:isDarkMode ? 'white' : 'black'}}>Dark Mode</Text>
        <Switch
            trackColor={{ false: '#767577', true: '#FF4500' }}
            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
      </View>
      <View style={{height:100}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pseudo: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  infoName: {
    fontSize: 15
  },
  infoValue: {
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default SettingsScreen;
  