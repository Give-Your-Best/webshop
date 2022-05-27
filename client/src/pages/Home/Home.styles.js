import styled from 'styled-components';
import { Box } from '../../components';

export const ItemsWrapper = styled(Box)`
  margin: 1rem auto;
  max-width: 60rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1em auto;
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
  margin: 3rem auto;
  max-width: 60rem;

  > h2 {
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

  > h3 {
    text-align: center;
    margin-bottom: 1px;
    font-weight: normal;
  }
`;

export const H2 = styled.h2`
 text-align:center;
`
