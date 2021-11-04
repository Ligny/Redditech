import React, { useState, useContext } from 'react';
import { Picker, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { StoreContext } from '../utils/Store';

import Post from './Post';

const PostPicker = () => {
  const [selectedValue, setSelectedValue] = useState("Top");
  const {isDarkMode} = useContext(StoreContext);

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIdex) => {
          setSelectedValue(itemValue);
        }}>
        <Picker.Item label="Top" value={"Top"} />
        <Picker.Item label="New" value={"New"}/>
        <Picker.Item label="Controversial" value={"Controversial"}/>
      </Picker>
      {selectedValue == "Top" ?
      <Post sortType={"top"} /> : selectedValue == "New" ?
      <Post sortType={"new"} /> : <Post sortType={"controversial"}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#DFDFDF'
  },
});

export default PostPicker;