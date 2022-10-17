import styled, { keyframes } from 'styled-components';

export const spinner = keyframes`
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
`


export const LoadingSpinner = styled.div`
    :before {
        animation: 1.5s linear infinite ${spinner};
        animation-play-state: inherit;
        border: solid 5px ${({ theme }) => theme.colorMappings.secondary};
        border-bottom-color: ${({ theme }) => theme.colorMappings.primary};
        border-radius: 50%;
        content: "";
        height: 100px;
        width: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        will-change: transform;
    }
`
