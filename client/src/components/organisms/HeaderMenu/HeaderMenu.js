import * as React from 'react';
import { HeaderMenuWrapper, LoginMenuItem } from './HeaderMenu.styles';

export const HeaderMenu = () => {
  return (
    <HeaderMenuWrapper>
      <LoginMenuItem href="/login">Login</LoginMenuItem>
    </HeaderMenuWrapper>
  );
};
