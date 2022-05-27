import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 0rem;
  margin: 0;
  flex: 1 0 auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1rem;
  }
`;
