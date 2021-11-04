import React, { useEffect, useContext, useState } from 'react';
import { Picker } from 'react-native';

import Subreddit from './Subreddit';


const HomeScreen = () => {
  const [selectedValue, setSelectedValue] = useState("Popular");

  return (
    <>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIdex) => {
          setSelectedValue(itemValue);
          }}>
        <Picker.Item label="Popular" value={"Popular"}/>
        <Picker.Item label="New" value={"New"}/>
      </Picker>
      {selectedValue == "Popular" ? <Subreddit requestType={'subreddits/popular'} /> : <Subreddit requestType={'subreddits/new'} />}
    </>
  );
}

export default HomeScreen;