import styled from 'styled-components';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 400px;
  background:  ${({ theme }) => theme.colorMappings.secondary};
  padding: 30px 10rem 30px;
  flex-shrink: 0;
  border-top: 15px solid #152f45;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1em;
  }
`;

export const SocialWrapper = styled.div`
  display: flex;
  width: 70%;
  margin: auto;

  div {
    display: block;
    width: 50%;
  }
  

  a {
    margin: 10px auto;
    border: 3px solid ${({ theme }) => theme.colorMappings.primary};
    border-radius: 100%;
    width: fit-content;
  }

  img {
    width: 50px !important;
    padding: 10px;
  }
`

export const FooterItem = styled.div`
  width: 25%;
  text-align: center;

  img {
    width: 148px;
    display: block;
    margin: auto;
  }

  p {
    font-size: 14px !important;

    a {
      color: ${({ theme }) => theme.colorMappings.primary};
      display: inline;
    }
  }

  a {
    font-size: 14px !important;
    display: block;
    color: black;
    text-decoration: underline;
  }
`;

export const FooterItemWider = styled.div`
  width: 40%;
  text-align: center;
  margin-left: 3rem;

  img {
    width: 148px;
    display: block;
    margin: auto;
  }

  p {
    font-size: 14px !important;
    text-align: left;

    a {
      color: ${({ theme }) => theme.colorMappings.primary};
      display: inline;
    }
  }

  a {
    font-size: 14px !important;
    display: block;
    color: black;
    text-decoration: underline;
  }
`;