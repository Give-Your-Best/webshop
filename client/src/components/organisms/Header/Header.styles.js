import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 125px;
  background:  ${({ theme }) => theme.colorMappings.secondary};
  padding: .5em 4em .5em 2em;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0.5em;
    min-height: 75px;
  }
`;

export const LogoWrapper = styled(Link)`
  display: inline-block;

  > img {
    width: 8rem;
    height: auto;
    max-width: 8rem;
    max-height: 8rem;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-right: 0.5rem;

    > img {
      max-width: 4rem;
      max-height: 4rem;
    }
  }
`;
