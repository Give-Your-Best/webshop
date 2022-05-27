import styled from 'styled-components';

export const BasketWrapper = styled.div`
  display: flex;
`;

export const BasketDetails = styled.div`
    padding: 2em;
    width: 100%;
    margin: 0 3em;
    display: block;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
`;

export const BasketSidebar = styled.div`
  width: 200px;
`;

export const BasketItem = styled.div`
    margin: 1em 0.5em;
    padding: 1em;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
`
