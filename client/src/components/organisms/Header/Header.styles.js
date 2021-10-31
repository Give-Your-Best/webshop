import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: inline-block;
  width: 100%;

  @media (max-width: 480px) {
    margin: 0 -1rem;
  }
`;

export const LogoWrapper = styled.a`
  display: inline-block;
  margin-right: 1rem;

  > img {
    width: auto;
    height: auto;
    max-width: 3.125rem;
    max-height: 3.125rem;
  }

  @media (max-width: 480px) {
    margin-right: 0.6875rem;

    > img {
      max-width: 2.5rem;
      max-height: 2.5rem;
    }
  }
`;
