import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 0rem;
  margin: 0;
  flex: 1 0 auto;

  h1 {
    font-family: 'Alfa Slab One', cursive;
    color: ${({ theme }) => theme.colorMappings.primary};
    font-size: 60px;
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
    padding: 1rem;
  }
`;
