import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme, primary, round }) => css`
    cursor: pointer;
    background: transparent;
    border-radius: 0.1rem;
    border: 2px solid ${theme.colorMappings.primary};
    color: ${theme.colorMappings.primary};
    margin: 0 1rem;
    padding: 0.3rem 1rem;

    ${primary &&
    css`
      background: ${theme.colorMappings.primary};
      color: ${theme.colorMappings.white};
    `};

    ${round &&
    css`
      border-radius: 50px;
    `};
  `}
`;
