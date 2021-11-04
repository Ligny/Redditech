import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer,  DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StoreContext } from './../utils/Store';
import HomeScreen from './Home';
import SettingsScreen from './Settings';
import ProfileScreen from './Profile';
import SearchScreen from './Search';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FF4500',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderBottomColor: '#FF4500',
          position: 'absolute',
          height: 60,
          borderRadius: 30,
          bottom: 20,
          left: 20,
          right: 20
        }
      }}
    >
      <Tab.Screen
        name={`Home`}
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderRadius: 10,
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={`Search`}
        component={SearchScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderRadius: 10,
          },
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={`Profile`}
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderRadius: 10,
          },
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={`Settings`}
        component={SettingsScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderRadius: 10,
          },
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const NavBar = () => {
  const { isDarkMode } = useContext(StoreContext);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}

export default NavBar;