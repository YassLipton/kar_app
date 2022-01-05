import * as React from 'react';
import AuthContext from './../context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialAuthState = {
  isLoading: false,
  isSignOut: false,
  userToken: '',
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        userToken: action.token,
        isSignOut: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null,
        isSignOut: true,
      };
    default:
      return state;
  }
};

const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialAuthState);
  const {userToken} = state;

  const authContext = React.useMemo(
    () => ({
      userToken,
      checkLog: async () => {
        const value = await AsyncStorage.getItem('log')
        dispatch({type: 'RESTORE_TOKEN', token: value});
      },
      signIn: async (param) => {
        await AsyncStorage.setItem('log', param)
        dispatch({type: 'SIGN_IN', token: param});
      },
      signOut: async () => {
        await AsyncStorage.removeItem('log')
        dispatch({type: 'SIGN_OUT'})
      },
      signUp: () => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [userToken],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
