import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 0 4rem;
  margin: 3em 0;
  flex: 1 0 auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0 1rem;
  }
`;
