import styled, { css } from 'styled-components';

export const Box = styled.div`
  ${({
    display,
    flex,
    flexDirection,
    m,
    mb,
    mt,
    ml,
    mr,
    pb,
    pt,
    pl,
    pr,
  }) => css`
    ${display && `display: ${display}`};
    ${flex && `flex: ${flex}`};
    ${flexDirection && `flex-direction: ${flexDirection}`};
    ${m && `margin: ${m}rem`};
    ${mb && `margin-bottom: ${mb}rem`};
    ${mt && `margin-top: ${mt}rem`};
    ${ml && `margin-left: ${ml}rem`};
    ${mr && `margin-right: ${mr}rem`};
    ${pb && `padding-bottom: ${pb}rem`};
    ${pt && `padding-top: ${pt}rem`};
    ${pl && `padding-left: ${pl}rem`};
    ${pr && `padding-right: ${pr}rem`};
  `}
`;
