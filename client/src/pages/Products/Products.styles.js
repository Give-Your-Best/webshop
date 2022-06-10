import styled from 'styled-components';
import { Box } from '../../components';

export const ItemsWrapper = styled(Box)`
  margin: 0.5rem auto 2rem auto;
  max-width: 80rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;

export const PageWrapper = styled.div`
  display: grid;
  width: 100%;
`

export const Heading = styled.h1`
  margin-bottom: 5px;
`