import styled from 'styled-components';
import { Box } from '../../components';

export const ItemsWrapper = styled(Box)`
  margin: 0 auto 2rem auto;
  max-width: 80rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;

export const PageWrapper = styled.div`
  width: 100%;
`
