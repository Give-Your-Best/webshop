import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 125px;
  background:  ${({ theme }) => theme.colorMappings.secondary};
  padding: 1em 4em;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0.5em;
    min-height: 75px;
  }
`;

export const LogoWrapper = styled(Link)`
  display: inline-block;
  margin-right: 1rem;

  > img {
    width: auto;
    height: auto;
    max-width: 6rem;
    max-height: 6rem;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-right: 0.5rem;

    > img {
      max-width: 4rem;
      max-height: 4rem;
    }
  }
`;
