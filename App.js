import * as React from 'react';
import {DarkTheme, DefaultTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance'
import MainStack from './src/stack/MainStack'
import AuthProvider from './src/common/AuthProvider'
import ThemeProvider from './src/common/ThemeProvider'
import CartProvider from './src/common/CartProvider';

function App() {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <MainStack />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}

export default App;