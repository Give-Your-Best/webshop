import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;

  > img {
    width: auto;
    height: auto;
    max-width: 3.125rem;
    max-height: 3.125rem;
  }

  @media (max-width: 480px) {
    margin-right: 0.7rem;

    > img {
      max-width: 2.5rem;
      max-height: 2.5rem;
    }
  }
`;
