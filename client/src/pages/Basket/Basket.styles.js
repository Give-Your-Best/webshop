import styled from 'styled-components';

export const BasketWrapper = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: block;
  }
`;

export const AddressLink = styled.p`
  cursor: pointer;
  text-decoration: underline;
`;

export const BasketDetails = styled.div`
  padding: 2em 2em 5em 2em;
  width: 100%;
  margin: 0 3em;
  display: block;
  border: 2px solid ${({ theme }) => theme.colorMappings.borders};
  border-radius: 30px;
  min-height: 600px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0;
  }

  h1 {
    font-family: lato;
    font-weight: bold;
    font-size: 26px;
  }

  h2 {
    font-family: lato;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
  }
`;

export const BasketSidebar = styled.div`
  width: 200px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: auto;
  }
`;

export const BasketItem = styled.div`
  margin: 1em 0.5em;
  padding: 1em;
  border: 1px solid ${({ theme }) => theme.colorMappings.borders};
`;
