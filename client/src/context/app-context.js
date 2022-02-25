import * as React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const value = React.useMemo(() => ({ 
    user, 
    token,
    setUser,
    setToken 
  }), [user, token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
