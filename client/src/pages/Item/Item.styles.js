import styled from 'styled-components';
import { Box } from '../../components';

export const ItemWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin: 3em 0 4em 0;
`;

export const ImagesWrapper = styled.div`
    display:flex;
    width: 50%;

    > img {
        width: 80%;
        height:fit-content;
        margin-left: 10px;
        border-radius: 1em !important;
        border: 1px solid ${({ theme }) => theme.colorMappings.borders};
    }
`

export const MiniImagesWrapper = styled(Box)`
  display:inline;
  max-width: 20%;
  min-width: 20%;

  > img {
    width: 100%;
    max-height: 200px;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
    border-radius: 10px;
    margin: 5px 0;
    cursor: pointer;
  }
`;

export const ItemDetailsWrapper = styled.div`
  width: 50%;
  margin-left: 3rem;

  h1 {
    text-align: left;
    font-family: lato;
    font-size: 48px;
    font-weight: bold;
  }

  p {
    font-family: lato;
    font-size: 24px;
    color: ${({ theme }) => theme.colorMappings.primary};
    margin-bottom: 5px;
  }
`;
