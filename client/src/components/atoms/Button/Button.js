import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme, primary, round, small, large, center, left, right }) => css`
    font-size: 22px;
    cursor: pointer;
    border-radius: 0.1rem;
    border: 2px solid ${theme.colorMappings.buttonBorders};
    color: ${theme.colorMappings.primary};
    margin: 0 5px 1em 0;
    padding: 0.3rem 1rem;
    float: right;
    min-height: 52px;
    font-weight: bold;

    @media (max-width:${({ theme }) => theme.mid}) {
      font-size: 18px;
      min-height: 46px;
    }

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
      background: ${theme.colorMappings.yellow};
      color: ${theme.colorMappings.primary};
    `};

    ${round &&
    css`
      border-radius: 3rem;
    `};

    ${small &&
    css`
      font-size: 20px !important;
      float: left;
    `};

    ${center &&
    css`
      width: 221px;
      margin: auto;
      float: none;
      display: block;
      min-height: 62px;
    `};

    ${large &&
    css`
      font-size: 1.2rem;
    `};
  `}
`;
