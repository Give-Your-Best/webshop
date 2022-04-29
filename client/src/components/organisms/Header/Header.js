import * as React from 'react';
import { AppHeading } from '../../';
import { CategoryMenu } from '../CategoryMenu';
import { HeaderMenu } from '../HeaderMenu';
import logo from './gyb_logo.png';
import { HeaderWrapper, LogoWrapper } from './Header.styles';

export const Header = () => {
  return (
    <div>
    <HeaderWrapper>
      <AppHeading>
        <LogoWrapper to="/">
          <img alt="give-your-best-logo" src={logo} />
        </LogoWrapper>
        <span style={{ verticalAlign: 'middle' }}>Give Your Best webshop</span>
      </AppHeading>
      <HeaderMenu />
    </HeaderWrapper>
    <CategoryMenu />
    </div>
  );
};
