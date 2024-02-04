import * as React from 'react';

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const [allTags, setAllTags] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [inboxSummary, setInboxSummary] = React.useState({});

  const value = React.useMemo(
    () => ({
      allTags,
      setAllTags,
      allUsers,
      setAllUsers,
      currentUser,
      setCurrentUser,
      inboxSummary,
      setInboxSummary,
    }),
    [allTags, allUsers, currentUser, inboxSummary]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
