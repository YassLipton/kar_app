import {DefaultTheme, DarkTheme} from '@react-navigation/native';
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'crimson',
    secondary: '#9b9b9b',
    text: '#333333',
    border: '#ededed',
  },
};
export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FC6A57',
    secondary: '#cccccc',
    card: '#282828',
    background: '#121212',
    border: '#333333',
  },
};
