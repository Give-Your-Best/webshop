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
  .slick-next,
  .slick-prev:hover,
  .slick-next:hover {
    font-size: 28px;
    font-weight: bold;
    font-family: 'Alfa Slab One', cursive;
    color: ${({ theme }) => theme.colorMappings.primary};

  }
`