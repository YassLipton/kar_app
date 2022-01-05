import * as React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance, useColorScheme } from 'react-native-appearance';
import TabNavigator from './TabNavigator';
import AuthContext from '../context/auth-context';
import SignInScreen from '../screens/SignInScreen';
import Loading from '../screens/Loading';
//import BottomBar from './BottomBar';
import { navigationRef } from '../../RootNavigation';
import { StatusBar, ActivityIndicator } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigatorCustom from './DrawerNavigatorCustom';
import DrawerNavigatorSmall from './DrawerNavigatorSmall';

const Stack = createStackNavigator();

let logChecked = false

const myDarkTheme={
  ...DarkTheme,
  colors:{
      ...DarkTheme.colors,   
      text:"#fff",
      statusBarColor:"#000"
  },
  dark: true
}

const myLightTheme={
  ...DefaultTheme,
  colors:{
      ...DefaultTheme.colors,
      text:"#000",
      statusBarColor:"rgb(242, 242, 242)"
  }
}

function MainStack() {
  const { userToken, signOut, checkLog } = React.useContext(AuthContext)
  const { mode } = React.useContext(ThemeContext)

  React.useEffect(() => {
    console.log('theme', mode)
    console.log(myLightTheme)
    console.log(myDarkTheme)
    if (!logChecked) {
      checkLog()
      logChecked = true
    }
  }, [userToken])

  return (
      <NavigationContainer ref={navigationRef} theme={mode === 'light' ? myLightTheme : myDarkTheme}>
        <StatusBar backgroundColor='#cfc357' />
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
        {
          logChecked
            ?
            <>
            {
              userToken
              ?
              <Stack.Screen
                name="Main"
                options={{headerShown: false}}
                component={TabNavigator}
              />
              :
              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
              />
            }
            </>
            :
            <Stack.Screen
              name="Loading"
              component={Loading}
            />
        }
        </Stack.Navigator>
        {/* <BottomBar /> */}
      </NavigationContainer>
  );
}

export default MainStack;