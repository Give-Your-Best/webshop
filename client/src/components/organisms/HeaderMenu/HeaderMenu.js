import * as React from 'react';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../../context/app-context';
import { HeaderMenuWrapper, UserMenuItem } from './HeaderMenu.styles';

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
      {!user && <UserMenuItem to="/login">Login</UserMenuItem>}
      {!user && <UserMenuItem to="/register">Sign up</UserMenuItem>}
      {user && (
        <>
          <span>Hello, <UserMenuItem to={`/user/${user.id}`}>{user.username}</UserMenuItem></span>
          <UserMenuItem to="/dashboard">Admin</UserMenuItem>
          <UserMenuItem onClick={handleLogoutClick} to="/">Logout</UserMenuItem>
        </>
      )}
    </HeaderMenuWrapper>
  );
};
