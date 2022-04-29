import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme, primary, round, small, large }) => css`
    font-size: 1rem;
    cursor: pointer;
    background: transparent;
    border-radius: 0.1rem;
    border: 0.13rem solid ${theme.colorMappings.primary};
    color: ${theme.colorMappings.primary};
    margin: 0;
    padding: 0.3rem 1rem;
    float: right;

    ${primary &&
    css`
      background: ${theme.colorMappings.primary};
      color: ${theme.colorMappings.white};
    `};

    ${round &&
    css`
      border-radius: 3rem;
    `};

    ${small &&
    css`
      font-size: 0.8rem;
      border-width: 0.1rem;
    `};

    ${large &&
    css`
      font-size: 1.2rem;
    `};
  `}
`;
