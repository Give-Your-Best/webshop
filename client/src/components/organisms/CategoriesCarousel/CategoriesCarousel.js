import * as React from 'react';
import { StyledCarousel } from './CategoriesCarousel.styles';
import { CategoryBlock } from '../../atoms/CategoryBlock';

export const CategoriesCarousel = ({categories}) => {

  return (
    <StyledCarousel slidesToShow={3} autoplay arrows>
    {categories.map((d) => {
      return (<CategoryBlock key={d.id} category={d}/>);
    })}
    </StyledCarousel>
  );
};