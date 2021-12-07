import * as React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const value = {
    user,
    token,
    setUser,
    setToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
