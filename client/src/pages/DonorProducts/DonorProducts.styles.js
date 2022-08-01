import styled from 'styled-components';
import { Box } from '../../components';

export const ItemsWrapper = styled(Box)`
  margin: 0 auto 2rem auto;
  background: ${({ theme }) => theme.colorMappings.background};
  max-width: 80rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    justify-content: space-between;
    margin: auto;
    width: 100%;
    min-width: 100%;
  }
`;

export const PageWrapper = styled.div`
  width: 100%;
`
