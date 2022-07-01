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
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.mid}) {
    padding: 10px 5rem 10px;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1em;
    display: block;
  }
`;

export const SocialWrapper = styled.div`
  display: flex;
  width: 60%;
  margin: auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

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
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

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
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    margin: 0;
  }

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