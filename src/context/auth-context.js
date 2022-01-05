import * as React from 'react';

const initialAuthState = {
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  checkLog: () => {},
}

const AuthContext = React.createContext(initialAuthState);

export default AuthContext;