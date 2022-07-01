import { Carousel } from 'antd';
import styled from 'styled-components';

export const StyledCarousel = styled(Carousel)`
  border: none;
  margin: 4rem auto;
  max-width: 90%;

  > .slick-dots {
    display: none !important;
  }

  .slick-prev,
  .slick-prev:hover,
  .slick-prev:focus {
    font-family: 'Alfa Slab One', cursive;
    font-size: 40px;
    cursor: pointer;
    display:inherit;
    color: ${({ theme }) => theme.colorMappings.primary};
  }
  
  .slick-next,
  .slick-next:hover,
  .slick-next:focus {
    font-family: 'Alfa Slab One' !important;
    font-size: 40px;
    cursor: pointer;
    display:inherit;
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`