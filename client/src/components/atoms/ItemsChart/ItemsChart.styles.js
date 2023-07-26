import styled from 'styled-components';

export const StyledBar = styled.div`
  display: block;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

export const StyledMobileBar = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: block;
  }
`;
