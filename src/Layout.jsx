import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import GuestMainScreen from './screens/GuestMainScreen';
import GuestLoginScreen from './screens/GuestLoginScreen';
import GuestSignScreen from './screens/GuestSignScreen';
import DraftMainScreen from './screens/DraftMainScreen';
import ForecastsMainScreen from './screens/ForecastsMainScreen';
import ProfileMainScreen from './screens/ProfileMainScreen';
import HomeScreen from './screens/HomeScreen';

import DraftIcon from './assets/icons/DraftIcon';
import PredictionIcon from './assets/icons/PredictionIcon';
import ProfileIcon from './assets/icons/ProfileIcon';

import { useAuth } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();
const GuestStack = createNativeStackNavigator();
const DraftStack = createNativeStackNavigator();
const ForecastsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function DraftStackScreen() {
  return (
    <DraftStack.Navigator>
      <DraftStack.Screen
        name="DraftMain"
        component={DraftMainScreen}
        options={{ title: "Draft" }}
      />
    </DraftStack.Navigator>
  );
}

function ForecastsStackScreen() {
  return (
    <ForecastsStack.Navigator>
      <ForecastsStack.Screen
        name="ForecastsMain"
        component={ForecastsMainScreen}
        options={{ title: "Forecasts" }}
      />
    </ForecastsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileMainScreen}
        options={{ title: "Profile" }}
      />
    </ProfileStack.Navigator>
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
          options={{ title: "Login", headerBackTitle: "Back" }}
        />
        <GuestStack.Screen
          name="GuestSign"
          component={GuestSignScreen}
          options={{ title: "SignUp", headerBackTitle: "Back" }}
        />
      </GuestStack.Navigator>
    ) : (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Draft"
          component={DraftStackScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <DraftIcon focused={focused} color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Forecasts"
          component={ForecastsStackScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <PredictionIcon focused={focused} color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <ProfileIcon focused={focused} color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    )
  )
}
