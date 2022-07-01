import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 125px;
  background:  ${({ theme }) => theme.colorMappings.secondary};
  padding: 0 calc((100vw - 80rem) / 2);
  @media (max-width: ${({ theme }) => theme.mobile}) {
    justify-content: center;
    min-height: 100px;
  }
`;

export const LogoWrapper = styled(Link)`
  display: inline-block;

  > img {
    width: 190px;
    height: 190px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: block;

    > img {
      width: 100px;
      height: 100px;
      margin: auto;
    }
  }
`;
