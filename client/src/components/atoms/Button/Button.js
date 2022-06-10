import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme, primary, round, small, large, center, left, right }) => css`
    font-size: 22px;
    cursor: pointer;
    border-radius: 0.1rem;
    border: 2px solid ${theme.colorMappings.primary};
    color: ${theme.colorMappings.primary};
    margin: 1em 5px 1em 0;
    padding: 0.3rem 1rem;
    float: right;
    min-height: 44px;

    ${left &&
    css`
      float: left;
    `};

    ${right &&
      css`
        float: right !important;
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
      font-size: 18px !important;
      float: left;
    `};

    ${center &&
    css`
      width: 221px;
      margin: auto;
      float: none;
    `};

    ${large &&
    css`
      font-size: 1.2rem;
    `};
  `}
`;
