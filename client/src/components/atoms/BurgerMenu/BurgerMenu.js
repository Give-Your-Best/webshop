import React from 'react';
import { StyledBurger } from './BurgerMenu.styles';
import { showMobileMenu } from '../../../utils/helpers';

export const BurgerMenu = () => {
  return (
    <StyledBurger onClick={showMobileMenu}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
