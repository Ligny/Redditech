import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { StoreContext } from '../utils/Store';

import Subreddit from './Subreddit';

const SearchScreen = () => {
  const [search, setSearch] = useState();
  const {isDarkMode} = useContext(StoreContext);

  return (
    <>
      <SearchBar
        containerStyle={{
          backgroundColor: isDarkMode ? 'black' : 'white',
          borderBottomColor: isDarkMode ? 'black' : 'white',
          borderTopColor: isDarkMode ? 'black' : 'white',
          borderRadius:10,
        }}
        inputContainerStyle={{backgroundColor:'#DFDFDF'}}
        placeholder="Type Here..."
        value={search}
        onChangeText={(e) => setSearch(e)}
      />
      <Subreddit requestType={`subreddits/search.json?q=${search}`} />
    </>
  );
}

export default SearchScreen;
