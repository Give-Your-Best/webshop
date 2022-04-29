import styled from 'styled-components';

export const AccountWelcomeWrapper = styled.div`
  text-align: center; 

  > h3 {
    margin: 1em 0 2em 0;
    font-weight: normal;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 90%;
  }
`;
