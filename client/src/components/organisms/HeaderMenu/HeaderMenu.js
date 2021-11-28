import * as React from 'react';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../../context/app-context';
import { HeaderMenuWrapper, LoginMenuItem } from './HeaderMenu.styles';

export const HeaderMenu = () => {
  const [, , removeCookie] = useCookies();
  const { user, setUser, setToken } = React.useContext(AppContext);

  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    removeCookie('jwt_user', { path: '/' });
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
