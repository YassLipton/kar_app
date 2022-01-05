import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';
import HomeStack from './HomeStack';
import History from '../screens/History';
import SettingsStack from './SettingsStack';
import { Icon } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  let theme = useTheme();
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: theme.dark ? '#121212' : '#fff'}
      }}
    >
      <Tab.Screen name="Accueil" component={HomeStack} options={{ tabBarIcon: ({color}) => <Ionicons name='home-outline' color={color} size={20} />, tabBarActiveTintColor: '#4c34e0' }} />
      <Tab.Screen name="Mes séries" component={History} options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name='history' color={color} size={25} />, tabBarActiveTintColor: '#4c34e0' }} />
      <Tab.Screen name="Paramètres" component={SettingsStack} options={{ tabBarIcon: ({color}) => <Ionicons name='settings-outline' color={color} size={25} />, tabBarActiveTintColor: '#4c34e0' }} />
    </Tab.Navigator>
  );
}

export default MyTabs
