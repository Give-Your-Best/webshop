import styled, { css } from 'styled-components';

export const Box = styled.div`
  ${({
    display,
    flex,
    flexDirection,
    flexWrap,
    justifyContent,
    m,
    mb,
    mt,
    ml,
    mr,
    mx,
    my,
    pb,
    pt,
    pl,
    pr,
  }) => css`
    ${display && `display: ${display}`};
    ${flex && `flex: ${flex}`};
    ${flexDirection && `flex-direction: ${flexDirection}`};
    ${flexWrap && `flex-wrap: ${flexWrap}`};
    ${justifyContent && `justify-content: ${justifyContent}`};
    ${m && `margin: ${m}rem`};
    ${mb && `margin-bottom: ${mb}rem`};
    ${mt && `margin-top: ${mt}rem`};
    ${ml && `margin-left: ${ml}rem`};
    ${mr && `margin-right: ${mr}rem`};
    ${mx &&
    `
    margin-left: ${mx}rem;
    margin-right: ${mx}rem;
    `};
    ${my &&
    `
    margin-top: ${my}rem;
    margin-bottom: ${my}rem;
    `};
    ${pb && `padding-bottom: ${pb}rem`};
    ${pt && `padding-top: ${pt}rem`};
    ${pl && `padding-left: ${pl}rem`};
    ${pr && `padding-right: ${pr}rem`};
  `}
`;
