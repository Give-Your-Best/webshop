import * as React from 'react';
import { AppHeading } from '../../';
import logo from './gyb_logo.png';
import { HeaderWrapper, LogoWrapper } from './Header.styles';

export const Header = () => {
  return (
    <HeaderWrapper data-testid="Header">
      <AppHeading>
        <LogoWrapper>
          <img alt="give-your-best-logo" src={logo} />
        </LogoWrapper>
        <span style={{ verticalAlign: 'middle' }}>Give Your Best webshop</span>
      </AppHeading>
    </HeaderWrapper>
  );
};
