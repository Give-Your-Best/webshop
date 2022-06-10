import styled from 'styled-components';
import { Box } from '../../components';

export const ItemsWrapper = styled(Box)`
  margin: 1rem auto;
  max-width: 80rem;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1em auto 4em auto;
`;

export const FiltersWrapper = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colorMappings.borders};
  height: 3rem;
  padding: 0.6rem 1rem;

  &:hover {
    box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.1);
  }
`;

export const CategoriesWrapper = styled(Box)`
  margin: 1rem auto;
  max-width: 80rem;

  > h1 {
    text-align: center;
  }
`

export const CoverWrapper = styled.div`
  display: block;

  > img {
    width: 100%;
    margin: 0;
  }

  > h1 {
    text-align: center;
    margin-bottom: 2px;
  }

  > p {
    text-align: center;
    margin-bottom: 1px;
    font-size: 24px;
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;

export const H1 = styled.h1`
 text-align:center;
`
