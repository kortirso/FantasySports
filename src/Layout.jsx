import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import GuestMainScreen from './screens/GuestMainScreen';
import GuestLoginScreen from './screens/GuestLoginScreen';
import GuestSignScreen from './screens/GuestSignScreen';
import HomeScreen from './screens/HomeScreen';

import { useAuth } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();
const GuestStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

export default function Layout() {
  const { authState } = useAuth();

  return (
    !authState.accessToken ? (
      <GuestStack.Navigator> 
        <GuestStack.Screen
          name="GuestMain"
          component={GuestMainScreen}
          options={{ title: "", headerShown: false }}
        />
        <GuestStack.Screen
          name="GuestLogin"
          component={GuestLoginScreen}
          options={{ title: "", headerBackTitle: "Back" }}
        />
        <GuestStack.Screen
          name="GuestSign"
          component={GuestSignScreen}
          options={{ title: "", headerBackTitle: "Back" }}
        />
      </GuestStack.Navigator>
    ) : (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Draft" component={HomeStackScreen} />
        <Tab.Screen name="Prediction" component={HomeStackScreen} />
        <Tab.Screen name="Profile" component={HomeStackScreen} />
      </Tab.Navigator>
    )
  )
}