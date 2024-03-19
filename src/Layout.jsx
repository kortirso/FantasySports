import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { strings } from './locales';

import GuestMainScreen from './screens/GuestMainScreen';
import DraftMainScreen from './screens/DraftMainScreen';
import ForecastsMainScreen from './screens/ForecastsMainScreen';
import ForecastsShowScreen from './screens/ForecastsShowScreen';
import ProfileMainScreen from './screens/ProfileMainScreen';
import HomeScreen from './screens/HomeScreen';
import UnconfirmedScreen from './screens/UnconfirmedScreen';
import BannedScreen from './screens/BannedScreen';

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
  const { authState } = useAuth();

  strings.setLanguage(authState.locale);

  return (
    <DraftStack.Navigator>
      <DraftStack.Screen
        name="DraftMain"
        component={DraftMainScreen}
        options={{ title: strings.navigation.draft }}
      />
    </DraftStack.Navigator>
  );
}

function ForecastsStackScreen() {
  const { authState } = useAuth();

  strings.setLanguage(authState.locale);

  return (
    <ForecastsStack.Navigator>
      <ForecastsStack.Screen
        name="ForecastsMain"
        component={ForecastsMainScreen}
        options={{ title: strings.navigation.forecasts }}
      />
      <ForecastsStack.Screen
        name="ForecastShow"
        component={ForecastsShowScreen}
        options={{ title: "", headerBackTitle: strings.navigation.back }}
      />
    </ForecastsStack.Navigator>
  );
}

function ProfileStackScreen() {
  const { authState } = useAuth();

  strings.setLanguage(authState.locale);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileMainScreen}
        options={{ title: strings.navigation.profile }}
      />
    </ProfileStack.Navigator>
  );
}

export default function Layout() {
  const { authState } = useAuth();

  strings.setLanguage(authState.locale);

  if (!authState.accessToken) return (
    <GuestStack.Navigator> 
      <GuestStack.Screen
        name="GuestMain"
        component={GuestMainScreen}
        options={{ title: "", headerShown: false }}
      />
    </GuestStack.Navigator>
  );

  if (!authState.confirmed) return <UnconfirmedScreen />;
  if (authState.banned) return <BannedScreen />;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={strings.navigation.draftShort}
        component={DraftStackScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <DraftIcon focused={focused} color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={strings.navigation.forecasts}
        component={ForecastsStackScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <PredictionIcon focused={focused} color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={strings.navigation.profile}
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <ProfileIcon focused={focused} color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
