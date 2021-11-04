import React, { createContext } from 'react';
import { View } from 'react-native';
import Login from './components/Login';
import Redirect from './components/Redirect';
import createStore, { StoreContext } from './utils/Store'

const App = () => {
  const store = createStore();

  return (
    <StoreContext.Provider value={store}>
      {!store.isAuthenticated.authenticated ? <Login/> : <Redirect/>}
    </StoreContext.Provider>
  );
}

export default App;
