import styled from 'styled-components';

export const AccountWelcomeWrapper = styled.div`
  text-align: center;

  > h3 {
    margin: 0.5em 0 2em 0;
    font-family: Lato;
    font-size: 24px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin: 0.5em 0 0.5em 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 90%;
  }
`;

export const AccountWelcomeIcon = styled.div`
  width: 175px;
  height: 175px;
  box-shadow: 0px 3px 6px #ba191a29;
  border-radius: 100%;
  margin: auto;
  position: relative;
  text-transform: uppercase;

  p {
    font-size: 50px !important;
    font-weight: bold;
    margin: 0;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 3px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
