/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import GuestMainScreen from './src/screens/GuestMainScreen';
import GuestLoginScreen from './src/screens/GuestLoginScreen';
import GuestSignScreen from './src/screens/GuestSignScreen';
import HomeScreen from './src/screens/HomeScreen';

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

export default function App() {
  const [pageState, setPageState] = useState({
    userSession: undefined
  });

  useEffect(() => {
    const getUserSession = async () => await EncryptedStorage.getItem("user_session");

    Promise.all([getUserSession()]).then(([userSession]) => {
      setPageState({
        ...pageState,
        userSession: userSession
      })
    });
  }, []);

  if (pageState.userSession === undefined) {
    return (
      <NavigationContainer>
        <GuestStack.Navigator>
          <GuestStack.Screen
            name="GuestMain"
            component={GuestMainScreen}
            options={{ title: "" }}
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
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Draft" component={HomeStackScreen} />
        <Tab.Screen name="Prediction" component={HomeStackScreen} />
        <Tab.Screen name="Profile" component={HomeStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
