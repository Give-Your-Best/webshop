import { Carousel } from 'antd';
import styled from 'styled-components';

export const StyledCarousel = styled(Carousel)`
  border: none;

  > .slick-dots {
    bottom: -20px !important;
  }

  > .slick-dots li {
    background: black;
  }

  > .slick-dots li.slick-active {
    background: ${({ theme }) => theme.colorMappings.primary};
    border: ${({ theme }) => theme.colorMappings.primary};
  }
`