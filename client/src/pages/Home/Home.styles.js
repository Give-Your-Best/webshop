import styled from 'styled-components';
import { Box } from '../../components';

export const AppWrapper = styled.div`
  padding: 0 2rem;
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const ItemsWrapper = styled(Box)`
  @media (max-width: 480px) {
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;

export const FiltersWrapper = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colorMappings.borders};
  height: 3rem;
  padding: 0.6rem 1rem;

  &:hover {
    box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.1);
  }
`;
