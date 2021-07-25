import styled from 'styled-components';

export const AppHeading = styled.h1`
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 2rem;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
