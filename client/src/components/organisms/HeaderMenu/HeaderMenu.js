import * as React from 'react';
import { AppContext } from '../../../context/app-context';
import { HeaderMenuWrapper, UserMenuItem } from './HeaderMenu.styles';

export const HeaderMenu = () => {
  const { user } = React.useContext(AppContext);

  return (
    <HeaderMenuWrapper>
      {!user && <UserMenuItem to="/login">Login</UserMenuItem>}
      {user && (
        <>
          <UserMenuItem to="/dashboard">Account</UserMenuItem>
        </>
      )}
      <UserMenuItem to="/basket">Basket</UserMenuItem>
    </HeaderMenuWrapper>
  );
};
