import * as React from 'react';
import { AppContext } from '../../../context/app-context';
import { HeaderMenuWrapper, LoginMenuItem } from './HeaderMenu.styles';

export const HeaderMenu = () => {
  const { user, setUser, setToken } = React.useContext(AppContext);

  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    // TODO: also remove token from api headers
    // and remove cookie (server)
  };
  return (
    <HeaderMenuWrapper>
      {!user && <LoginMenuItem to="/login">Login</LoginMenuItem>}
      {user && (
        <>
          <span>Hello, {user.username}</span>
          <span style={{ marginLeft: 16 }} onClick={handleLogoutClick}>
            Logout
          </span>
        </>
      )}
    </HeaderMenuWrapper>
  );
};
