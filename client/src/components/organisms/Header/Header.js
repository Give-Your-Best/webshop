import * as React from 'react';
import { AppHeading } from '../../';
// import { HeaderMenu } from '../HeaderMenu';
import logo from './gyb_logo.png';
import { HeaderWrapper, LogoWrapper } from './Header.styles';

export const Header = () => {
  return (
    <HeaderWrapper data-testid="Header">
      {/* bring back when login page is more functional and looks better */}
      {/* <HeaderMenu /> */}
      <AppHeading>
        <LogoWrapper to="/">
          <img alt="give-your-best-logo" src={logo} />
        </LogoWrapper>
        <span style={{ verticalAlign: 'middle' }}>Give Your Best webshop</span>
      </AppHeading>
    </HeaderWrapper>
  );
};
