import * as React from 'react';
import { AppHeading } from '../../';
import { Banner } from '../Banners';
// import { CategoryMenu } from '../CategoryMenu';
// import { MobileMenu } from '../MobileMenu';
// import { HeaderMenu } from '../HeaderMenu';
// import { BurgerMenu } from '../../atoms/BurgerMenu';
import logo from './gyb_logo_2.svg';
import { HeaderWrapper, LogoWrapper } from './Header.styles';

export const Header = () => {
  return (
    <div>
      <HeaderWrapper data-testid="Header">
        <AppHeading>
          <LogoWrapper to="/">
            <img alt="give-your-best-logo" src={logo} />
          </LogoWrapper>
        </AppHeading>
        {/* <BurgerMenu />
        <MobileMenu />
        <HeaderMenu /> */}
      </HeaderWrapper>
      <Banner />
      {/* <CategoryMenu /> */}
    </div>
  );
};
