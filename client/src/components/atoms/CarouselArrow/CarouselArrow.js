import * as React from 'react';
import { Arrow } from './CarouselArrow.styles';

export const CarouselArrow = ({ direction }) => {
  return (
    <Arrow>
      {direction === 'left' ? '<' : direction === 'right' ? '>' : ''}
    </Arrow>
  );
};
