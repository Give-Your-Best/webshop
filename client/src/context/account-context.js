import * as React from 'react';

import { AppContext } from './app-context';

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const { user } = React.useContext(AppContext);

  const [allTags, setAllTags] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState(null);

  console.log(user); // Depending on user type we will expose data or not

  const value = React.useMemo(
    () => ({
      allTags,
      allUsers,
      setAllTags,
      setAllUsers,
    }),
    [allTags, allUsers]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
