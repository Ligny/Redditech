import React, { useEffect, useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType, exchangeCodeAsync } from 'expo-auth-session';
import { Button, StyleSheet, View } from 'react-native';

import { StoreContext } from './../utils/Store';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

const Login = () => {
  const { setIsAuthenticated } = useContext(StoreContext);
  const [request, response, promptAsync] = useAuthRequest({
      clientId: 'Lg2nX0wlmq9le_KZpKkdSQ',
      scopes: ['identity', 'mysubreddits', 'read', 'account', 'creddits', 'edit', 'flair', 'history',
      'livemanage', 'modconfig', 'modcontributors', 'modflair', 'modlog', 'modmail', 'modothers', 'modposts'],
      redirectUri: makeRedirectUri({
        native: "https://auth.expo.io/@angny/redditek",
        useProxy: true,
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      exchangeCodeAsync(
        {
          clientId: 'Lg2nX0wlmq9le_KZpKkdSQ',
          clientSecret: 'HEGWRrorrR_mZRkiyoQUx0NhHm5gTQ',
          code: code,
          redirectUri: makeRedirectUri({
            native: "https://auth.expo.io/@angny/redditek",
            useProxy: true,
          }),
        },
        discovery
      )
      .then((token) => {
        setIsAuthenticated({accessToken: token.accessToken, authenticated: true});
      });
    }
}, [response]);

  return (
    <View style={styles.container}>
      <Button
        color='#FF4500'
        disabled={!request}
        title="connect to reddit"
        onPress={() => { promptAsync({useProxy: true}); }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

}); 

export default Login;