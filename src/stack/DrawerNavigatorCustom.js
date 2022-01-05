import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';
import HomeStack from './HomeStack';
import History from '../screens/History';
import SettingsStack from './SettingsStack';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const width = useWindowDimensions().width * 0.3;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.title}>Kikooo</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigatorCustom({ navigation }) {
  let theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerLeft: () => <Ionicons name='menu' size={30} color='#4c34e0' style={{marginLeft: 20}} onPress={() => navigation.openDrawer()} />,
        drawerStyle: {backgroundColor: theme.dark ? '#121212' : '#fff'}
      })}
    >
      <Drawer.Screen name="Accueil" component={HomeStack} options={{ headerShown: false, drawerIcon: ({color}) => <Ionicons name='home-outline' color={color} size={20} />, drawerActiveTintColor: '#4c34e0'}} />
      <Drawer.Screen name="Mon Historique" component={History} options={{ headerShown: true, drawerIcon: ({color}) => <MaterialCommunityIcons name='history' color={color} size={25} />, drawerActiveTintColor: '#4c34e0' }} />
      <Drawer.Screen name="Mon Compte" component={SettingsStack} options={{ drawerIcon: ({color}) => <MaterialCommunityIcons name='account' color={color} size={25} />, drawerActiveTintColor: '#4c34e0' }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigatorCustom

const styles = StyleSheet.create({
  header: {
    width: '100%', 
    height: 80, 
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title:{
    fontSize: 25,
    color: '#4c34e0'
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});
