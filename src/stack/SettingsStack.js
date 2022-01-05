import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings';
import { Ionicons } from 'react-native-vector-icons';

const Stack = createStackNavigator();

function SettingsStack() {

  return (
      <Stack.Navigator
        screenOptions={({navigation}) => {
          console.log('navigation', navigation.openDrawer)
          return ({
            headerShown: false,
            // headerLeft: () => navigation.openDrawer ? <Ionicons name='menu' size={30} color='#fff' style={{marginLeft: 20}} onPress={() => navigation.openDrawer()} /> : undefined
          })
        }}
      >
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Paramètres'}}
        />
      </Stack.Navigator>
  );
}

export default SettingsStack;