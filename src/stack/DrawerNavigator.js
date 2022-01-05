import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';
import HomeStack from './HomeStack';
import History from '../screens/History';
import SettingsStack from './SettingsStack';
import { Icon } from 'react-native-vector-icons';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  let theme = useTheme();
  return (
    <Drawer.Navigator 
      screenOptions={({navigation}) => ({
        headerShown: false,
        headerLeft: () => <Ionicons name='menu' size={30} color='#fff' style={{marginLeft: 20}} onPress={() => navigation.openDrawer()} />,
        drawerStyle: {backgroundColor: theme.dark ? '#121212' : '#fff'}
      })}
    >
      <Drawer.Screen name="Accueil" component={HomeStack} options={{ drawerIcon: ({color}) => <Ionicons name='home-outline' color={color} size={20} />, drawerActiveTintColor: '#4c34e0'}} />
      <Drawer.Screen name="Mon Historique" component={History} options={{ headerShown: true, drawerIcon: ({color}) => <MaterialCommunityIcons name='history' color={color} size={25} />, drawerActiveTintColor: '#4c34e0' }} />
      <Drawer.Screen name="Mon Compte" component={SettingsStack} options={{ drawerIcon: ({color}) => <MaterialCommunityIcons name='account' color={color} size={25} />, drawerActiveTintColor: '#4c34e0', headerLeft: () => <Ionicons name='menu' size={30} color='#fff' /> }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator
