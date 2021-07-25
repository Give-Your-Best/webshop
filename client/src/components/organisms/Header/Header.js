import * as React from 'react';
import { AppHeading, Box } from '../../';
import logo from './gyb_logo.png';
import { LogoWrapper } from './Header.styles';

export const Header = () => {
  return (
    <Box>
      <AppHeading>
        <LogoWrapper>
          <img alt="give-your-best-logo" src={logo} />
        </LogoWrapper>
        <span style={{ verticalAlign: 'middle' }}>Give Your Best webshop</span>
      </AppHeading>
    </Box>
  );
};
