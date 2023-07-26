import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 0rem;
  margin: 0;
  flex: 1 0 auto;

  h1 {
    font-family: 'Alfa Slab One', cursive;
    color: ${({ theme }) => theme.colorMappings.primary};
    font-size: 60px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 26px;
      margin-top: 1em;
    }
  }

  .hideOnMobile {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      display: none;
    }
  }

  .fixedOnMobile {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      max-width: 120px;
    }
  }

  .fixedOnMobileSmall {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      max-width: 100px;
    }
  }

  h2 {
    font-family: 'Alfa Slab One', cursive;
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  h3 {
    font-family: 'Alfa Slab One', cursive;
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0.1rem;
  }
`;
