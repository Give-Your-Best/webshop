import * as React from 'react';
import { StyledCarousel, StyledCarouselMobile } from './CategoriesCarousel.styles';
import { CategoryBlock } from '../../atoms/CategoryBlock';

export const CategoriesCarousel = ({categories}) => {

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
    </button>
  );

  return (
    <>
      <StyledCarousel slidesToShow={4} arrows nextArrow={<SlickArrowRight />} prevArrow={<SlickArrowLeft />}>
        {categories.map((d) => {
          return (<CategoryBlock key={d.id} category={d}/>);
        })}
      </StyledCarousel>
      <StyledCarouselMobile slidesToShow={2} arrows nextArrow={<SlickArrowRight />} prevArrow={<SlickArrowLeft />}>
        {categories.map((d) => {
          return (<CategoryBlock key={d.id} category={d}/>);
        })}
      </StyledCarouselMobile>
    </>
  );
};