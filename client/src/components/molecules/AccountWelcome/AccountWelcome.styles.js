import styled from 'styled-components';

export const AccountWelcomeWrapper = styled.div`
  text-align: center; 

  > h3 {
    margin: 0.5em 0 2em 0;
    font-family: Lato;
    font-size: 24px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 90%;
  }
`;
