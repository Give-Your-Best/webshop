import styled from 'styled-components';
import { Box } from '../../components';

export const ItemWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
`;

export const ImagesWrapper = styled.div`
    display:flex;
    width: 50%;

    > img {
        width: 80%;
        height:fit-content;
        margin-left: 10px;
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
    margin: 5px 0;
    cursor: pointer;
  }
`;

export const ItemDetailsWrapper = styled.div`
  width: 50%;
  margin-left: 3rem;
`;
