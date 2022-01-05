import * as React from 'react';
import {DarkTheme, DefaultTheme} from '@react-navigation/native'
import { Appearance } from 'react-native-appearance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemeContext from '../context/ThemeContext';

const myDarkTheme={
  ...DarkTheme,
  colors:{
      ...DarkTheme.colors,   
      primary: '#4c34e0', 
      secondary: '#121212', 
      third: '#cccccc', 
      card: '#282828',
      text:"#fff",
      statusBarColor:"#000"
  },
  dark: true
}

const myLightTheme={
  ...DefaultTheme,
  colors:{
      ...DefaultTheme.colors, 
      primary: '#4c34e0', 
      secondary: '#737373',
      background: '#f5f7fb',
      card: '#ececee',
      text:"#000",
      statusBarColor:"rgb(242, 242, 242)"
  }
}

function ThemeProvider({children}) {
  const [themeState, setThemeState] = React.useState('light')
  const setMode = async mode => {
    setThemeState(mode)
    await AsyncStorage.setItem('theme', mode)
  }
  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(async ({ colorScheme }) => {
      setThemeState(colorScheme)
      const value = await AsyncStorage.getItem('theme')
      if (value == 'dark') {
        setMode('dark')
      }
    })
    return () => subscription.remove()
  }, [])
  return (
      <ThemeContext.Provider 
        value={{
          mode: themeState, 
          setMode: setMode,
          theme: themeState == 'light' ? myLightTheme : myDarkTheme
        }}
        >
        {children}
      </ThemeContext.Provider>
  );
}

export default ThemeProvider;