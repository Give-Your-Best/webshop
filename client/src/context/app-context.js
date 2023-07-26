import * as React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [basket, setBasket] = React.useState(null);
  const [basketTimer, setBasketTimer] = React.useState(null);

  const value = React.useMemo(
    () => ({
      user,
      token,
      basket,
      basketTimer,
      setUser,
      setToken,
      setBasket,
      setBasketTimer,
    }),
    [user, token, basket, basketTimer]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
