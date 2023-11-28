import * as React from 'react';

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const [allTags, setAllTags] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  const value = React.useMemo(
    () => ({
      allTags,
      setAllTags,
      allUsers,
      setAllUsers,
      currentUser,
      setCurrentUser,
    }),
    [allTags, allUsers, currentUser]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
