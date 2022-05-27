import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme, primary, round, small, large, center, left }) => css`
    font-size: 1rem;
    cursor: pointer;
    background: transparent;
    border-radius: 0.1rem;
    border: 0.13rem solid ${theme.colorMappings.primary};
    color: ${theme.colorMappings.primary};
    margin: 1em 5px 1em 0;
    padding: 0.3rem 1rem;
    float: right;

    ${left &&
    css`
      float: left;
    `};

    ${primary &&
    css`
      background: ${theme.colorMappings.blue};
      color: ${theme.colorMappings.primary};
    `};

    ${round &&
    css`
      border-radius: 3rem;
    `};

    ${small &&
    css`
      font-size: 0.8rem;
      border-width: 0.1rem;
      float: left;
    `};

    ${center &&
    css`
      width: 200px;
      margin: auto;
      float: none;
    `};

    ${large &&
    css`
      font-size: 1.2rem;
    `};
  `}
`;
