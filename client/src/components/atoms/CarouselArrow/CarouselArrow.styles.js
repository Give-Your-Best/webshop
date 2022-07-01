import styled from 'styled-components';

export const Arrow = styled.span`
    font-family: 'Alfa Slab One', cursive;
    font-size: 60px;
    cursor: pointer;
    display:inherit;
    color: ${({ theme }) => theme.colorMappings.primary};
`;
