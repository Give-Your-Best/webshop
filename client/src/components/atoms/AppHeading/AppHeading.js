import styled from 'styled-components';

export const AppHeading = styled.h1`
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1rem;
  }
`;
