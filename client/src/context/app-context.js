import * as React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState({ name: 'eirini' });
  const [token, setToken] = React.useState('this-is-not-a-token');

  const value = {
    user,
    token,
    setUser,
    setToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
