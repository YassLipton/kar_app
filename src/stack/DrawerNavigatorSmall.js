import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useRoute, useTheme } from '@react-navigation/native';
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
  console.log('--------', props)
  // const {state} = props
  // const {routes, index} = state
  // console.log('--------', routes, index)
  // console.log('>>>>>>>>', routes[index].name)
  const width = useWindowDimensions().width * 0.3;
  const height = useWindowDimensions().height - 32;
  return (
    <DrawerContentScrollView {...props}>
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.title}>Kikooo</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{flexDirection: 'column', justifyContent: 'space-between', height: height}}>
        <View>
          <DrawerItem
            onPress={() => props.navigation.navigate('Accueil')}
            focused={props.state.index === props.state.routes.findIndex(e => e.name === "Accueil")}
            activeBackgroundColor={'#ffffff10'}
            activeTintColor={'#4c34e0'}
            label={({focused, color}) => {
              console.log(focused, color)
              return (
                <View style={{width: width - 32, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name='home-outline' color={focused ? '#4c34e0' : color} size={32} />
                  <Text style={{color: focused ? '#4c34e0' : color, fontSize: 15, marginTop: 1, textAlign: 'center'}}>Accueil</Text>
                </View>
              )
            }}
          />
          <DrawerItem
            onPress={() => props.navigation.navigate('Mon Historique')}
            focused={props.state.index === props.state.routes.findIndex(e => e.name === "Mon Historique")}
            activeBackgroundColor={'#ffffff10'}
            label={({focused, color}) => {
              console.log(focused, color)
              return (
                <View style={{width: width - 32, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialCommunityIcons name='history' color={focused ? '#4c34e0' : color} size={32} />
                  <Text style={{color: focused ? '#4c34e0' : color, fontSize: 15, marginTop: 1, textAlign: 'center'}}>Mon Historique</Text>
                </View>
              )
            }}
          />
          <DrawerItem
            onPress={() => props.navigation.navigate('Mon Compte')}
            focused={props.state.index === props.state.routes.findIndex(e => e.name === "Mon Compte")}
            activeBackgroundColor={'#ffffff10'}
            label={({focused, color}) => {
              console.log(focused, color)
              return (
                <View style={{width: width - 32, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialCommunityIcons name='account' color={focused ? '#4c34e0' : color} size={32} />
                  <Text style={{color: focused ? '#4c34e0' : color, fontSize: 15, marginTop: 1, textAlign: 'center'}}>Compte</Text>
                </View>
              )
            }}
          />
        </View>
        <View>
          <DrawerItem
            onPress={() => props.navigation.navigate('Accueil')}
            focused={props.state.index === props.state.routes.findIndex(e => e.name === "Settings")}
            activeBackgroundColor={'#ffffff10'}
            activeTintColor={'#4c34e0'}
            label={({focused, color}) => {
              console.log(focused, color)
              return (
                <View style={{width: width - 32, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name='settings-outline' color={focused ? '#4c34e0' : color} size={32} />
                  <Text style={{color: focused ? '#4c34e0' : color, fontSize: 15, marginTop: 1}}>Paramètres</Text>
                </View>
              )
            }}
          />
        </View>
      </View>
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
}

function DrawerNavigatorSmall({ navigation }) {
  let theme = useTheme();
  const width = useWindowDimensions().width * 0.3;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerLeft: () => <Ionicons name='menu' size={30} color='#4c34e0' style={{marginLeft: 20}} onPress={() => navigation.openDrawer()} />,
        drawerStyle: {backgroundColor: theme.dark ? '#121212' : '#fff', width: width},
        drawerItemStyle: {flexDirection: 'column'},
      })}
    >
      <Drawer.Screen name="Accueil" component={HomeStack} options={{ headerShown: false, drawerIcon: ({color}) => <Ionicons name='home-outline' color={color} size={20} />, drawerActiveTintColor: '#4c34e0'}} />
      <Drawer.Screen name="Mon Historique" component={History} options={{ headerShown: true, drawerIcon: ({color}) => <MaterialCommunityIcons name='history' color={color} size={25} />, drawerActiveTintColor: '#4c34e0' }} />
      <Drawer.Screen name="Mon Compte" component={SettingsStack} options={{ drawerIcon: ({color}) => <MaterialCommunityIcons name='account' color={color} size={25} />, drawerActiveTintColor: '#4c34e0' }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigatorSmall

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
