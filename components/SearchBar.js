import React, { useState } from 'react';
import { Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

const SearchBar = () => {
  const [search, setSearch] = useState();

  return (
    <SearchBar
      placeholder="Type Here..."
      value={search}
      onChangeText={(e) => setSearch(e)}
    />
  );
}
