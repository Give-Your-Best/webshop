import * as React from 'react';
import { StyledCarousel } from './CategoriesCarousel.styles';
import { CategoryBlock } from '../../atoms/CategoryBlock';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export const CategoriesCarousel = ({categories}) => {

  return (
    <StyledCarousel slidesToShow={4} autoplay arrows nextArrow={<RightOutlined />} prevArrow={<LeftOutlined />}>
    {categories.map((d) => {
      return (<CategoryBlock key={d.id} category={d}/>);
    })}
    </StyledCarousel>
  );
};